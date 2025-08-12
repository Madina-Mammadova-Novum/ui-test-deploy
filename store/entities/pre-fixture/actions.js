import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { PRE_FIXTURE } from '@/store/entities/pre-fixture/types';

/* Adapters */
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
/* Services */
import { getRoleBasedPrefixture } from '@/services';
import { getAssignedTasks, getTaskExtensionTimeOptions } from '@/services/assignedTasks';
import { calculateAmountOfPages, getCookieFromBrowser } from '@/utils/helpers';

export const fetchPrefixtureOffers = createAsyncThunk(PRE_FIXTURE.GET_PRE_FIXTURE_OFFERS, async ({ page, perPage }) => {
  const { data, recordsTotal } = await getRoleBasedPrefixture({ page, perPage });

  // Enhance offers with assigned tasks data
  const enhancedOffers = await Promise.all(
    data.map(async (offer) => {
      try {
        const assignedTasksResponse = await getAssignedTasks({
          targetId: offer.id,
          purpose: 'PreFixture',
        });

        // First try to find the task with status "Created", otherwise take the first one
        const tasks = assignedTasksResponse?.data || [];
        const currentUserId = getCookieFromBrowser && getCookieFromBrowser('session-user-id');
        const createdTask =
          tasks.find((task) => task.status === 'Created' && String(task.assignTo?.userId) === String(currentUserId)) ||
          tasks.find((task) => task.status === 'Created') ||
          tasks[0];

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

  return {
    data: { offers: enhancedOffers, totalPages: calculateAmountOfPages(recordsTotal, perPage) },
  };
});

export const fetchDealCountdownData = createAsyncThunk(
  PRE_FIXTURE.GET_DEAL_COUNTDOWN_DATA,
  async ({ dealId }, { rejectWithValue }) => {
    try {
      if (!dealId) {
        return rejectWithValue('Deal ID is required');
      }

      const assignedTasksResponse = await getAssignedTasks({
        targetId: dealId,
        purpose: 'PreFixture',
      });

      // First try to find the task with status "Created", otherwise take the first one
      const tasks = assignedTasksResponse?.data || [];
      const currentUserId = getCookieFromBrowser && getCookieFromBrowser('session-user-id');
      const createdTask =
        tasks.find((task) => task.status === 'Created' && String(task.assignTo?.userId) === String(currentUserId)) ||
        tasks.find((task) => task.status === 'Created') ||
        tasks[0];

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
