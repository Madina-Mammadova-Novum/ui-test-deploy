import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Step } from '@/elements';
import { CompanyAddresess, CompanyDetails, PersonalDetails, SlotsDetails, TermsAndConditions } from '@/modules';
import { setCargoes, setRules } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { useHookForm } from '@/utils/hooks';

const ChartererForm = () => {
  const dispatch = useDispatch();
  const { rules } = useSignupSelector();
  const { watch } = useHookForm();

  const slots = watch('slots.count');

  const handleRules = useCallback(() => {
    dispatch(setRules(!rules));
  }, [dispatch, rules]);

  const handleSlots = useCallback(() => {
    dispatch(setCargoes([slots]));
  }, [dispatch, slots]);

  return (
    <Form
      ctaProps={{ text: 'Create account', variant: 'primary', size: 'large' }}
      disabled={!rules}
      className="flex flex-col pt-5"
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
      <Step title="Step #4: Company Addresss" containerClass="flex flex-col py-5 gap-5">
        <CompanyAddresess />
      </Step>
      <hr className="divide" />
      <Step title="Step 5: Recent Chartering Experience" containerClass="flex flex-col py-5 gap-5">
        <SlotsDetails
          label="HOW MANY CARGOES HAVE YOU CHARTERED DURING THE LAST 6 MONTHS?"
          placeholder="Carogoes"
          onClick={handleSlots}
        />
      </Step>
      <TermsAndConditions checked={rules} onChange={handleRules} containerClass="pb-5" />
    </Form>
  );
};

export default ChartererForm;
