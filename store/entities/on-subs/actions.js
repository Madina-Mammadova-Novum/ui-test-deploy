import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ON_SUBS } from './types';

/* Adapters */
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
/* Services */
import { getRoleBasedOnSubs } from '@/services';
import { getAssignedTasks, getTaskExtensionTimeOptions } from '@/services/assignedTasks';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchOnSubsOffers = createAsyncThunk(ON_SUBS.GET_ON_SUBS_OFFERS, async ({ page, perPage }) => {
  const { data, recordsTotal } = await getRoleBasedOnSubs({ page, perPage });

  // Enhance offers with assigned tasks data
  const enhancedOffers = await Promise.all(
    data.map(async (offer) => {
      try {
        const assignedTasksResponse = await getAssignedTasks({
          targetId: offer.id,
          purpose: 'LiftSubs',
        });

        // First try to find the task with status "Created", otherwise take the first one
        const tasks = assignedTasksResponse?.data || [];
        const createdTask = tasks.find((task) => task.status === 'Created') || tasks[0];

        const expiresAt = createdTask?.countdownTimer?.expiresAt;
        const countdownStatus = createdTask?.countdownTimer?.status || 'NotStarted';
        const taskId = createdTask?.id;
        const { assignTo, initiator } = createdTask || {};

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
