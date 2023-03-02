import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Step } from '@/elements';
import { setRules, setTankers } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { CompanyAddresess, CompanyDetails, PersonalDetails, SlotsDetails, TermsAndConditions } from '@/ui';
import { useHookForm } from '@/utils/hooks';

const OwnerForm = () => {
  const dispatch = useDispatch();
  const { rules } = useSignupSelector();
  const { watch } = useHookForm();

  const slots = watch('slots.count');

  const handleRules = useCallback(() => {
    dispatch(setRules(!rules));
  }, [dispatch, rules]);

  const handleSlots = useCallback(() => {
    dispatch(setTankers([slots]));
  }, [dispatch, slots]);

  return (
    <Form
      ctaProps={{ text: 'Create account', variant: 'primary', size: 'large' }}
      className="flex flex-col pt-5"
      disabled={!rules}
    >
      <hr className="divide" />
      <Step title="Step #2: Personal details" containerClass="flex flex-col py-5 gap-5">
        <PersonalDetails />
      </Step>
      <hr className="divide" />
      <Step title="Step #3: Choose who you are" containerClass="flex flex-col py-5 gap-5">
        <CompanyDetails />
      </Step>
      <hr className="divide" />
      <Step title="Step 4: How many tankers do you have?" containerClass="flex flex-col py-5 gap-5">
        <SlotsDetails label="NUMBER OF TANKERS" placeholder="tankers" onClick={handleSlots} />
      </Step>
      <hr className="divide" />
      <Step title="Step #5: Company Addresss" containerClass="flex flex-col py-5 gap-5">
        <CompanyAddresess />
      </Step>
      <TermsAndConditions checked={rules} onChange={handleRules} containerClass="pb-5" />
    </Form>
  );
};

export default OwnerForm;
