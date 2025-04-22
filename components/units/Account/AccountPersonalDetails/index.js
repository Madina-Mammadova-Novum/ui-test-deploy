'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AccountPersonalDetailsPropTypes } from '@/lib/types';

import { Button, FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import StatusIndicator from '@/elements/StatusIndicator';
import { PersonalDetailsForm } from '@/modules';
import { cancelUpdateInfo } from '@/services';
import { fetchUserProfileData } from '@/store/entities/user/actions';
import { ModalWindow } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const AccountPersonalDetails = ({ user = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { firstName, lastName, email, phone, pendingRequest } = user;

  const printPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '—';
    return `+${phoneNumber}`;
  };

  const handleCancelRequest = async () => {
    setIsLoading(true);
    const { error } = await cancelUpdateInfo();
    setIsLoading(false);

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      successToast(
        'Your update request has been cancelled',
        'You can update your personal info anytime you want. The remaining changes will still require admin approval.'
      );

      dispatch(fetchUserProfileData());
    }
  };

  return (
    <FieldsetWrapper>
      <FieldsetHeader title="User Details">
        <div className="flex gap-2">
          {pendingRequest ? (
            <Button
              buttonProps={{
                text: 'Cancel Request',
                variant: 'delete',
                size: 'medium',
                className: '!px-2.5 !py-0.5 text-xsm',
              }}
              onClick={handleCancelRequest}
              disabled={isLoading}
            />
          ) : null}
          <ModalWindow
            containerClass="w-[672px]"
            buttonProps={{
              text: 'Edit',
              variant: 'primary',
              size: 'medium',
              className: '!px-2.5 !py-0.5 text-xsm',
            }}
          >
            <PersonalDetailsForm />
          </ModalWindow>
        </div>
      </FieldsetHeader>
      <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold text-black">
        <StatusIndicator status={pendingRequest ? 'PendingRequest' : 'Active'} />
        {pendingRequest ? 'Update Requested' : 'Active'}
      </span>
      <FieldsetContentWrapper className="grid grid-cols-1 pt-2.5 3md:grid-cols-2">
        <FieldsetContent className="col-start-1">
          <TextRow title="First Name">{firstName || '—'}</TextRow>
          <TextRow title="Last Name">{lastName || '—'}</TextRow>
          <TextRow title="Email Address">{email || '—'}</TextRow>
        </FieldsetContent>
        <FieldsetContent className="col-start-1 pt-5 3md:col-start-2 3md:pt-0">
          <TextRow title="Phone number">{printPhoneNumber(phone)}</TextRow>
        </FieldsetContent>
      </FieldsetContentWrapper>
    </FieldsetWrapper>
  );
};

AccountPersonalDetails.propTypes = AccountPersonalDetailsPropTypes;

export default AccountPersonalDetails;
