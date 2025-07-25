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
        const [liftSubsTasksResponse, clearanceFileRequestTasksResponse] = await Promise.all([
          getAssignedTasks({
            targetId: offer.id,
            purpose: 'LiftSubs',
          }),
          getAssignedTasks({
            targetId: offer.id,
            purpose: 'ClearanceFileRequest',
          }),
        ]);

        // Logic for LiftSubs
        const liftSubsTasks = liftSubsTasksResponse?.data || [];
        const liftSubsCreatedTask = liftSubsTasks.find((task) => task.status === 'Created') || liftSubsTasks[0];

        const liftSubsExpiresAt = liftSubsCreatedTask?.countdownTimer?.expiresAt;
        const liftSubsCountdownStatus = liftSubsCreatedTask?.countdownTimer?.status || 'Expired';
        const liftSubsTaskId = liftSubsCreatedTask?.id;
        const { assignTo, initiator } = liftSubsCreatedTask || {};

        let liftSubsAllowExtension = false;
        let liftSubsExtensionTimeOptions = [];

        if (liftSubsTaskId) {
          try {
            const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId: liftSubsTaskId });
            liftSubsAllowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
            liftSubsExtensionTimeOptions = extensionTimeOptionsResponse?.data?.options || [];
          } catch (extensionError) {
            console.error(`Error fetching LiftSubs extension time options for offer ${offer.id}:`, extensionError);
          }
        }

        // Logic for ClearanceFileRequest
        const clearanceFileTasks = clearanceFileRequestTasksResponse?.data || [];
        const clearanceFileCreatedTask =
          clearanceFileTasks.find((task) => task.status === 'Created') || clearanceFileTasks[0];

        const docExpiresAt = clearanceFileCreatedTask?.countdownTimer?.expiresAt;
        const docCountdownStatus = clearanceFileCreatedTask?.countdownTimer?.status || 'Expired';
        const docTaskId = clearanceFileCreatedTask?.id;

        let docAllowExtension = false;
        let docExtensionTimeOptions = [];

        if (docTaskId) {
          try {
            const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId: docTaskId });
            docAllowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
            docExtensionTimeOptions = extensionTimeOptionsResponse?.data?.options || [];
          } catch (extensionError) {
            console.error(
              `Error fetching ClearanceFileRequest extension time options for offer ${offer.id}:`,
              extensionError
            );
          }
        }

        const documentCountdown = {
          expiresAt: docExpiresAt,
          countdownStatus: docCountdownStatus,
          allowExtension: docAllowExtension,
          extensionTimeOptions: extensionTimeOptionsAdapter({ options: docExtensionTimeOptions }),
          taskId: docTaskId,
        };

        return {
          ...offer,
          expiresAt: liftSubsExpiresAt,
          countdownStatus: liftSubsCountdownStatus,
          allowExtension: liftSubsAllowExtension,
          extensionTimeOptions: extensionTimeOptionsAdapter({ options: liftSubsExtensionTimeOptions }),
          taskId: liftSubsTaskId,
          assignTo,
          initiator,
          documentCountdown,
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
