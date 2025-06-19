'use client';

import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import { ROUTES } from '@/lib';
import { chartererSignUp } from '@/services';
import {
  CompanyAddressStepForm,
  CompanyDetailsStepForm,
  FleetInformationStepForm,
  PersonalDetailsStepForm,
  Stepper,
} from '@/units';
import { getFieldFromKey, setCookie } from '@/utils/helpers';
import { errorToast, redirectAfterToast } from '@/utils/hooks';

const STEPS = [
  { id: 1, title: 'User Details', isCompleted: false },
  { id: 2, title: 'Company Details', isCompleted: false },
  { id: 3, title: 'Recent Chartering Experience', isCompleted: false },
  { id: 4, title: 'Company Address', isCompleted: false },
];

const STORAGE_KEY = 'charterer_registration_data';

const ChartererRegistrationForm = ({ countries }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(STEPS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const [stepValidities, setStepValidities] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  // Load saved data from localStorage on mount
  React.useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
    } catch (error) {
      console.warn('Failed to load saved registration data:', error);
    }
  }, []);

  // Save data to localStorage whenever formData changes
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.warn('Failed to save registration data:', error);
    }
  }, [formData]);

  const handleFormValid = useCallback((stepNumber, isValid, data) => {
    setStepValidities((prev) => {
      const currentValidity = prev[`step${stepNumber}`];
      if (currentValidity === isValid) return prev;
      return {
        ...prev,
        [`step${stepNumber}`]: isValid,
      };
    });

    setFormData((prev) => {
      const currentData = prev[`step${stepNumber}`];
      // Simple shallow comparison for data changes
      if (currentData === data || (currentData && Object.keys(currentData).length === Object.keys(data || {}).length)) {
        let isEqual = true;
        for (const key in data || {}) {
          if (currentData[key] !== data[key]) {
            isEqual = false;
            break;
          }
        }
        if (isEqual) return prev;
      }
      return {
        ...prev,
        [`step${stepNumber}`]: data,
      };
    });

    // Update step completion status
    setSteps((prev) => {
      const stepToUpdate = prev.find((step) => step.id === stepNumber);
      if (stepToUpdate && stepToUpdate.isCompleted === isValid) return prev;
      return prev.map((step) => (step.id === stepNumber ? { ...step, isCompleted: isValid } : step));
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Combine all form data
      const combinedData = {
        ...formData.step1,
        ...formData.step2,
        ...formData.step3,
        ...formData.step4,
      };

      const { error, data } = await chartererSignUp({ data: combinedData });

      if (!error) {
        setCookie('session-user-email', combinedData.email);

        // Clear saved data on successful registration
        localStorage.removeItem(STORAGE_KEY);

        Promise.resolve(redirectAfterToast(data.message, ROUTES.GETTING_STARTED));
      } else {
        const errorKeys = Object.keys(error?.errors || {});

        if (errorKeys.length > 0) {
          // Handle specific field errors by showing them in a toast
          const errorMessages = errorKeys
            .map((key) => {
              const fieldErrors = error.errors[key];
              return `${getFieldFromKey(key)}: ${fieldErrors.join(', ')}`;
            })
            .join('\n');

          errorToast('Validation Errors', errorMessages);
        }

        errorToast(error?.title, error?.message);
      }
    } catch (err) {
      errorToast('Registration Failed', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize callback functions for each step to prevent re-creation
  const step1Callback = useCallback((isValid, data) => handleFormValid(1, isValid, data), [handleFormValid]);
  const step2Callback = useCallback((isValid, data) => handleFormValid(2, isValid, data), [handleFormValid]);
  const step3Callback = useCallback((isValid, data) => handleFormValid(3, isValid, data), [handleFormValid]);
  const step4Callback = useCallback((isValid, data) => handleFormValid(4, isValid, data), [handleFormValid]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStepForm onFormValid={step1Callback} initialData={formData.step1} />;
      case 2:
        return <CompanyDetailsStepForm onFormValid={step2Callback} initialData={formData.step2} />;
      case 3:
        return <FleetInformationStepForm onFormValid={step3Callback} initialData={formData.step3} />;
      case 4:
        return (
          <CompanyAddressStepForm onFormValid={step4Callback} initialData={formData.step4} countries={countries} />
        );
      default:
        return null;
    }
  };

  const canProceed = stepValidities[`step${currentStep}`];
  const isLastStep = currentStep === STEPS.length;

  return (
    <div className="w-full">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isLastStep={isLastStep}
        canProceed={canProceed}
        isSubmitting={isSubmitting}
        contentClassName="max-w-[51.5rem] w-full"
      >
        {renderStepContent()}
      </Stepper>
    </div>
  );
};

ChartererRegistrationForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape()),
};

export default ChartererRegistrationForm;
