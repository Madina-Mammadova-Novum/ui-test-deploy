import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ON_SUBS } from './types';

/* Adapters */
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
/* Services */
import { getRoleBasedOnSubs } from '@/services';
import { getAssignedTasks, getTaskExtensionTimeOptions } from '@/services/assignedTasks';
import { calculateAmountOfPages, getCookieFromBrowser } from '@/utils/helpers';

export const fetchOnSubsOffers = createAsyncThunk(ON_SUBS.GET_ON_SUBS_OFFERS, async ({ page, perPage }) => {
  const { data, recordsTotal } = await getRoleBasedOnSubs({ page, perPage });

  // Enhance offers with assigned tasks data
  const enhancedOffers = await Promise.all(
    data.map(async (offer) => {
      try {
        const assignedTasksResponse = await getAssignedTasks({
          targetId: offer.id,
          purpose: 'Subject',
        });

        // First try to find the task with status "Created", otherwise take the first one
        const tasks = assignedTasksResponse?.data || [];
        const currentUserId = getCookieFromBrowser && getCookieFromBrowser('session-user-id');
        const createdTask =
          tasks.find((task) => task.status === 'Created' && String(task.assignTo?.userId) === String(currentUserId)) ||
          tasks.find((task) => task.status === 'Created') ||
          tasks[0];

        const expiresAt = createdTask?.countdownTimer?.expiresAt;
        const countdownStatus = createdTask?.countdownTimer?.status || 'NotStarted';
        const taskId = createdTask?.id;
        const { assignTo, initiator, extensionRequests } = createdTask || {};

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
          assignTo,
          initiator,
          extensionRequests,
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

export const fetchOnSubsDealCountdownData = createAsyncThunk(
  ON_SUBS.GET_DEAL_COUNTDOWN_DATA,
  async ({ dealId }, { rejectWithValue }) => {
    try {
      if (!dealId) {
        return rejectWithValue('Deal ID is required');
      }

      const assignedTasksResponse = await getAssignedTasks({
        targetId: dealId,
        purpose: 'Subject',
      });

      // First try to find the task with status "Created", otherwise take the first one
      const tasks = assignedTasksResponse?.data || [];
      const currentUserId = getCookieFromBrowser && getCookieFromBrowser('session-user-id');
      const createdTask =
        tasks.find((task) => task.status === 'Created' && String(task.assignTo?.userId) === String(currentUserId)) ||
        tasks.find((task) => task.status === 'Created') ||
        tasks[0];

      const expiresAt = createdTask?.countdownTimer?.expiresAt;
      const countdownStatus = createdTask?.countdownTimer?.status || 'NotStarted';
      const taskId = createdTask?.id;
      const { assignTo, initiator, extensionRequests } = createdTask || {};

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
        assignTo,
        initiator,
        extensionRequests,
        isCountdownActive: !!expiresAt && countdownStatus === 'Running',
      };
    } catch (error) {
      console.error(`Error fetching assigned tasks for deal ${dealId}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch countdown data');
    }
  }
);
