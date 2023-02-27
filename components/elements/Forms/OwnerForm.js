import Form from './Form';

import { Step } from '@/elements';
import { CompanyAddresess, CompanyDetails, PersonalDetails, TankerDetails } from '@/ui';
import { useHookForm } from '@/utils/hooks';

const OwnerForm = () => {
  const { watch } = useHookForm();

  const rules = watch('params.rules');

  return (
    <Form
      className="flex flex-col pt-5"
      ctaProps={{ text: 'Create account', variant: 'primary', size: 'large' }}
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
        <TankerDetails />
      </Step>
      <hr className="divide" />
      <Step title="Step #5: Company Addresss" containerClass="flex flex-col py-5 gap-5">
        <CompanyAddresess />
      </Step>
    </Form>
  );
};

OwnerForm.propTypes = {};

export default OwnerForm;
