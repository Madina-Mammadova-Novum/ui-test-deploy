import classNames from 'classnames';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import { Input, PhoneInput } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = ({ onUpdatePage = false }) => {
  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const values = getValues();

  const { pending, pendingRequest, firstName, lastName, email } = values;

  // Helper function to render label badge based on conditions
  const renderLabelBadge = (pendingValue, currentValue, fieldName) => {
    if (pendingRequest) {
      const isPending = pendingValue === currentValue;
      return <p className={classNames('font-bold', isPending ? 'text-green' : 'text-blue')}>{pendingValue}</p>;
    }

    if (onUpdatePage && fieldName !== 'email') {
      return '';
    }

    return '*';
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Input
          {...register('firstName')}
          label="First name"
          labelBadge={renderLabelBadge(pending?.name, firstName, 'firstName')}
          placeholder="John"
          error={errors.firstName?.message}
          disabled={isSubmitting || onUpdatePage}
        />
        <Input
          {...register('lastName')}
          label="Last name"
          labelBadge={renderLabelBadge(pending?.surname, lastName, 'lastName')}
          placeholder="Doe"
          error={errors.lastName?.message}
          disabled={isSubmitting || onUpdatePage}
        />
        <Input
          {...register('email')}
          label="Email"
          labelBadge={renderLabelBadge(pending?.email, email, 'email')}
          placeholder="Enter your email"
          error={errors.email?.message}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="w- b-l pt-5 text-sm font-semibold text-black">Contact Information</p>
        <div className="grid gap-5 md:grid-cols-2">
          <PhoneInput
            {...register('primaryPhone')}
            onBlur={() => {}}
            label="Primary phone number"
            disabled={isSubmitting}
            error={errors.primaryPhone?.message}
            dropdownClass={onUpdatePage ? '-top-[220px] h-[200px] overflow-x-hidden' : ''}
            labelBadge="*"
          />
          <PhoneInput
            onBlur={() => {}}
            {...register('secondaryPhone')}
            label="Secondary phone number (optional)"
            disabled={isSubmitting}
            error={errors.secondaryPhone?.message}
            dropdownClass={onUpdatePage ? '-top-[220px] h-[200px] overflow-x-hidden' : ''}
          />
        </div>
      </div>
    </>
  );
};

PersonalDetails.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetails;
