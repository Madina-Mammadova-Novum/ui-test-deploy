import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getAssignedTasks } from '@/services/assignedTasks';
import { updateAssignedTasksForOffers } from '@/store/entities/negotiating/slice';

export const useAssignedTasks = () => {
  const dispatch = useDispatch();

  const fetchAndUpdateAssignedTasks = useCallback(
    async (offers, parentId, type) => {
      if (!offers || offers.length === 0) {
        dispatch(updateAssignedTasksForOffers({ parentId, offers: [], type }));
        return;
      }

      try {
        const enhancedOffers = await Promise.all(
          offers.map(async (offer) => {
            try {
              const assignedTasksResponse = await getAssignedTasks({
                targetId: offer.id,
                purpose: 'Negotiating',
              });

              // Find the task with status "Created" and extract its countdown timer data
              const createdTask = assignedTasksResponse?.data?.find((task) => task.status === 'Created');
              const expiresAt = createdTask?.countdownTimer?.expiresAt;
              const countdownStatus = createdTask?.countdownTimer?.status || 'Expired';

              return {
                ...offer,
                expiresAt,
                countdownStatus,
              };
            } catch (error) {
              console.error(`Error fetching assigned tasks for offer ${offer.id}:`, error);
              return offer; // Return original offer if fetch fails
            }
          })
        );

        dispatch(updateAssignedTasksForOffers({ parentId, offers: enhancedOffers, type }));
      } catch (error) {
        console.error(`Error fetching assigned tasks for ${type} offers:`, error);
        dispatch(updateAssignedTasksForOffers({ parentId, offers, type })); // Fallback to original data
      }
    },
    [dispatch]
  );

  return { fetchAndUpdateAssignedTasks };
};
