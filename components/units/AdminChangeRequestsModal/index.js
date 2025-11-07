'use client';

import { useState } from 'react';

import { UilArrowRight, UilCheckCircle, UilClock, UilTimesCircle } from '@iconscout/react-unicons';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Title } from '@/elements';
import { approveChangeRequest, rejectChangeRequest } from '@/services/approvals';
import { Notes } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const AdminChangeRequestsModal = ({ closeModal, requests = [], cargoId = 'N/A' }) => {
  const [localRequests, setLocalRequests] = useState(requests);
  const [loadingStates, setLoadingStates] = useState({});

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Approved':
        return {
          icon: <UilCheckCircle size="16" className="fill-green" />,
          bgColor: 'bg-green-light',
          borderColor: 'border-green',
          textColor: 'text-green',
        };
      case 'Denied':
        return {
          icon: <UilTimesCircle size="16" className="fill-red" />,
          bgColor: 'bg-red-light',
          borderColor: 'border-red',
          textColor: 'text-red',
        };
      case 'Pending':
      default:
        return {
          icon: <UilClock size="16" className="fill-yellow" />,
          bgColor: 'bg-yellow-light',
          borderColor: 'border-yellow',
          textColor: 'text-yellow',
        };
    }
  };

  const handleApprove = async (requestId) => {
    setLoadingStates((prev) => ({ ...prev, [requestId]: 'approving' }));

    try {
      const response = await approveChangeRequest({ id: requestId, cargoId });

      if (!response.error) {
        successToast(response.message);
        setLocalRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: 'Approved' } : req)));
      } else {
        errorToast('Failed to approve change request', response.message || 'Please try again later.');
      }
    } catch (error) {
      errorToast('Failed to approve change request', 'An unexpected error occurred.');
    } finally {
      setLoadingStates((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  const handleReject = async (requestId) => {
    setLoadingStates((prev) => ({ ...prev, [requestId]: 'rejecting' }));

    try {
      const response = await rejectChangeRequest({ id: requestId, cargoId });

      if (!response.error) {
        successToast(response.message);
        setLocalRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: 'Denied' } : req)));
      } else {
        errorToast('Failed to reject change request', response.message || 'Please try again later.');
      }
    } catch (error) {
      errorToast('Failed to reject change request', 'An unexpected error occurred.');
    } finally {
      setLoadingStates((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  return (
    <div className="flex max-w-[672px] flex-col gap-y-4">
      <Title level="2">Deal Information Change Requests</Title>

      <Notes title="Action Required">
        <p className="text-xsm text-black">
          The platform administrator has requested changes to the deal information below. Please review each proposed
          change carefully and approve or reject based on your agreement. Your counterparty will also be required to
          review these changes before they can be applied to the deal.
        </p>
      </Notes>

      <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
        {localRequests.map((request) => {
          const statusConfig = getStatusConfig(request.status);

          return (
            <div key={request.id} className="rounded-lg border border-gray-darker bg-white p-4 shadow-sm">
              {/* Status Badge */}
              <div
                className={classnames(
                  'mb-3 inline-flex items-center gap-1.5 rounded-base border px-3 py-1.5',
                  statusConfig.bgColor,
                  statusConfig.borderColor
                )}
              >
                {statusConfig.icon}
                <span className={classnames('text-xs font-semibold uppercase', statusConfig.textColor)}>
                  {request.status}
                </span>
              </div>

              {/* Field Changes */}
              {request.targets?.map((target) => (
                <div key={target.id || target.name || `target-${request.id}`} className="space-y-3">
                  {target.fieldChanges?.map((fieldChange) => (
                    <div
                      key={fieldChange.fieldName || `field-${request.id}`}
                      className="rounded-base bg-gray-light p-3"
                    >
                      <p className="mb-2 text-xs font-semibold uppercase text-gray">
                        {fieldChange.fieldName || 'Field Name'}
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <p className="text-xs text-gray">Old Value:</p>
                          <p className="text-xsm font-bold text-black">{fieldChange.oldValue || 'N/A'}</p>
                        </div>

                        <UilArrowRight size="20" className="fill-blue" />

                        <div className="flex-1">
                          <p className="text-xs text-gray">New Value:</p>
                          <p className="text-xsm font-bold text-black">{fieldChange.newValue || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Reviewers Section */}
              {request.reviewers && request.reviewers.length > 0 && (
                <div className="mt-3 rounded-base border border-gray-darker bg-gray-light p-3">
                  <p className="mb-2 text-xs font-semibold uppercase text-gray">Counterparty Reviewers</p>
                  <div className="space-y-2">
                    {request.reviewers.map((reviewer) => {
                      const reviewerStatusConfig = getStatusConfig(reviewer.status);
                      return (
                        <div
                          key={reviewer.companyId || `${reviewer.companyType}-${request.id}`}
                          className="flex items-center justify-between rounded-base bg-white px-3 py-2"
                        >
                          <span className="text-xsm font-medium text-black">{reviewer.companyType || 'Company'}</span>
                          <div className="flex items-center gap-1.5">
                            {reviewerStatusConfig.icon}
                            <span className={classnames('text-xs font-semibold', reviewerStatusConfig.textColor)}>
                              {reviewer.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {request.status === 'Pending' && (
                <div className="mt-4 flex gap-x-2.5">
                  <Button
                    buttonProps={{
                      text: loadingStates[request.id] === 'rejecting' ? 'Rejecting...' : 'Reject',
                      variant: 'tertiary',
                      size: 'large',
                    }}
                    disabled={loadingStates[request.id] !== null}
                    customStyles="w-full whitespace-nowrap"
                    onClick={() => handleReject(request.id)}
                  />
                  <Button
                    buttonProps={{
                      text: loadingStates[request.id] === 'approving' ? 'Approving...' : 'Approve',
                      variant: 'primary',
                      size: 'large',
                    }}
                    disabled={loadingStates[request.id] !== null}
                    customStyles="w-full whitespace-nowrap"
                    onClick={() => handleApprove(request.id)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          buttonProps={{
            text: 'Close',
            variant: 'tertiary',
            size: 'large',
          }}
          customStyles="min-w-[120px]"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

AdminChangeRequestsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  cargoId: PropTypes.string,
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'Approved', 'Denied']).isRequired,
      targets: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.string,
          fieldChanges: PropTypes.arrayOf(
            PropTypes.shape({
              fieldName: PropTypes.string,
              newValue: PropTypes.string,
              oldValue: PropTypes.string,
            })
          ),
        })
      ),
      reviewers: PropTypes.arrayOf(
        PropTypes.shape({
          companyId: PropTypes.string,
          companyType: PropTypes.string,
          status: PropTypes.oneOf(['Pending', 'Approved', 'Denied']),
        })
      ),
    })
  ),
};

export default AdminChangeRequestsModal;
