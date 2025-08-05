import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { NEGOTIATING } from './types';

/* Adapters */
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
/* Services */
import { getRoleBasedNegotiating } from '@/services';
import { getAssignedTasks, getTaskExtensionTimeOptions } from '@/services/assignedTasks';
import { getOffersById } from '@/services/offer';
import { calculateAmountOfPages, getCookieFromBrowser } from '@/utils/helpers';

// Helper function to enhance offers with assigned tasks data
const enhanceOffersWithAssignedTasks = async (offers) => {
  return Promise.all(
    offers.map(async (offer) => {
      try {
        const assignedTasksResponse = await getAssignedTasks({
          targetId: offer.id,
          purpose: 'Negotiating',
        });

        // First try to find the task with status "Created", otherwise take the first one
        const tasks = assignedTasksResponse?.data || [];
        const createdTask = tasks.find((task) => task.status === 'Created') || tasks[0];

        const expiresAt = createdTask?.countdownTimer?.expiresAt;
        const countdownStatus = createdTask?.countdownTimer?.status || 'Expired';
        const taskId = createdTask?.id;

        // Fetch extension time options if we have a task ID
        let allowExtension = false;
        let extensionTimeOptions = [];

        if (taskId) {
          try {
            const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId });
            allowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
            extensionTimeOptions = extensionTimeOptionsResponse?.data?.options || [];
          } catch (extensionError) {
            console.error(`Error fetching extension time options for offer ${offer.id}:`, extensionError);
          }
        }

        return {
          ...offer,
          expiresAt,
          countdownStatus,
          allowExtension,
          extensionTimeOptions: extensionTimeOptionsAdapter({ options: extensionTimeOptions }),
          taskId,
        };
      } catch (error) {
        console.error(`Error fetching assigned tasks for offer ${offer.id}:`, error);
        return offer; // Return original offer if fetch fails
      }
    })
  );
};

// Helper function to enhance nested offers (incoming/sent/failed)
const enhanceNestedOffers = async (offerById) => {
  const enhancementPromises = Object.entries(offerById).map(async ([parentId, offerData]) => {
    const enhancedData = { failed: offerData.failed || [] };

    // Enhance incoming and sent offers in parallel
    const [incomingOffers, sentOffers] = await Promise.all([
      offerData.incoming && Array.isArray(offerData.incoming)
        ? enhanceOffersWithAssignedTasks(offerData.incoming)
        : Promise.resolve(offerData.incoming || []),
      offerData.sent && Array.isArray(offerData.sent)
        ? enhanceOffersWithAssignedTasks(offerData.sent)
        : Promise.resolve(offerData.sent || []),
    ]);

    enhancedData.incoming = incomingOffers;
    enhancedData.sent = sentOffers;

    return [parentId, enhancedData];
  });

  const enhancedEntries = await Promise.all(enhancementPromises);
  return Object.fromEntries(enhancedEntries);
};

export const fetchUserNegotiating = createAsyncThunk(NEGOTIATING.GET_DATA, async ({ page = 1, perPage = 5 }) => {
  const role = getCookieFromBrowser('session-user-role');

  const { data, recordsTotal } = await getRoleBasedNegotiating({ role, page, perPage });

  const generator = getOffersById({ data, role });
  const { value } = generator.next();

  const result = await value;

  const offerById = data.reduce((acc, item) => {
    acc[item.id] = result?.find((offer) => offer[item.id])[item.id];
    return acc;
  }, {});

  // Enhance all nested offers with assigned tasks data
  const enhancedOfferById = await enhanceNestedOffers(offerById);

  return {
    data: { offers: data, totalPages: calculateAmountOfPages(recordsTotal, perPage), offerById: enhancedOfferById },
  };
});

export const fetchDealCountdownData = createAsyncThunk(
  NEGOTIATING.GET_DEAL_COUNTDOWN_DATA,
  async ({ dealId }, { rejectWithValue }) => {
    try {
      if (!dealId) {
        return rejectWithValue('Deal ID is required');
      }

      const assignedTasksResponse = await getAssignedTasks({
        targetId: dealId,
        purpose: 'Negotiating',
      });

      // First try to find the task with status "Created", otherwise take the first one
      const tasks = assignedTasksResponse?.data || [];
      const createdTask = tasks.find((task) => task.status === 'Created') || tasks[0];

      const expiresAt = createdTask?.countdownTimer?.expiresAt;
      const countdownStatus = createdTask?.countdownTimer?.status || 'Expired';
      const taskId = createdTask?.id;

      // Fetch extension time options if we have a task ID
      let allowExtension = false;
      let extensionTimeOptions = [];

      if (taskId) {
        try {
          const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId });
          allowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
          extensionTimeOptions = extensionTimeOptionsResponse?.data?.options || [];
        } catch (extensionError) {
          console.error(`Error fetching extension time options for deal ${dealId}:`, extensionError);
        }
      }

      return {
        dealId,
        expiresAt,
        countdownStatus,
        allowExtension,
        extensionTimeOptions: extensionTimeOptionsAdapter({ options: extensionTimeOptions }),
        taskId,
        isCountdownActive: !!expiresAt && countdownStatus === 'Running',
      };
    } catch (error) {
      console.error(`Error fetching assigned tasks for deal ${dealId}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch countdown data');
    }
  }
);
