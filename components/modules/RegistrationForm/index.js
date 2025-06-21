'use client';

import React, { useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { ROUTES } from '@/lib';
import { chartererSignUp, ownerSignUp } from '@/services';
import {
  CharteringExperienceStepForm,
  CompanyDetailsStepForm,
  FleetInformationStepForm,
  IdentityVerificationStepForm,
  PersonalDetailsStepForm,
  RegistrationDocumentsStepForm,
  Stepper,
} from '@/units';
import { getFieldFromKey, setCookie } from '@/utils/helpers';
import { errorToast, redirectAfterToast } from '@/utils/hooks';

const STEPS = [
  { id: 1, title: 'User Details', isCompleted: false },
  { id: 2, title: 'Company Details', isCompleted: false },
  { id: 3, title: 'Fleet Information', isCompleted: false },
  { id: 4, title: 'Registration Documents', isCompleted: false },
  { id: 5, title: 'Identity Verification', isCompleted: false },
];

const ROLE_CONFIG = {
  owner: {
    step3Title: 'Fleet Information',
    signUpService: ownerSignUp,
    storageKey: 'owner_registration_data',
  },
  charterer: {
    step3Title: 'Recent Chartering Experience',
    signUpService: chartererSignUp,
    storageKey: 'charterer_registration_data',
  },
};

const RegistrationForm = ({ countries, userRole = 'charterer' }) => {
  const config = ROLE_CONFIG[userRole];
  const steps = STEPS.map((step) => (step.id === 3 ? { ...step, title: config.step3Title } : step));

  const [currentStep, setCurrentStep] = useState(1);
  const [stepsState, setStepsState] = useState(steps);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
  });

  // References to form methods for each step
  const [stepFormMethods, setStepFormMethods] = useState({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(config.storageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
    } catch (error) {
      console.warn('Failed to load saved registration data:', error);
    }
  }, [config.storageKey]);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(formData));
    } catch (error) {
      console.warn('Failed to save registration data:', error);
    }
  }, [formData, config.storageKey]);

  useEffect(() => {
    console.log({ userRole });
  }, [userRole]);

  const handleFormMethodsReady = useCallback((stepNumber, methods) => {
    setStepFormMethods((prev) => ({
      ...prev,
      [`step${stepNumber}`]: methods,
    }));
  }, []);

  const handleFormValid = useCallback((stepNumber, isValid, data) => {
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
    setStepsState((prev) => {
      const stepToUpdate = prev.find((step) => step.id === stepNumber);
      if (stepToUpdate && stepToUpdate.isCompleted === isValid) return prev;
      return prev.map((step) => (step.id === stepNumber ? { ...step, isCompleted: isValid } : step));
    });
  }, []);

  const handleNext = useCallback(async () => {
    // Get the current step's form methods
    const currentFormMethods = stepFormMethods[`step${currentStep}`];

    if (!currentFormMethods) {
      console.warn('Form methods not ready for current step');
      return;
    }

    // Trigger form validation and submission
    const isValid = await currentFormMethods.trigger();

    if (isValid) {
      // If we're on step 3, create the account before proceeding
      if (currentStep === 3) {
        await handleAccountCreation();
      }

      // Form is valid, proceed to next step or complete registration
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Final step completion - redirect to getting started
        Promise.resolve(redirectAfterToast('Welcome to Ship.Link!', ROUTES.GETTING_STARTED));
      }
    } else {
      // Form has validation errors - they will be displayed automatically
      console.log('Form validation failed for step', currentStep);
    }
  }, [currentStep, stepFormMethods]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleAccountCreation = async () => {
    setIsSubmitting(true);

    try {
      // Combine all form data
      const combinedData = {
        ...formData.step1,
        ...formData.step2,
        ...formData.step3,
      };

      const { error, data } = await config.signUpService({ data: combinedData });

      if (!error) {
        setCookie('session-user-email', combinedData.email);

        // Clear saved data on successful registration
        localStorage.removeItem(config.storageKey);

        // Don't redirect yet, let user proceed to steps 4 and 5
        console.log('Account created successfully:', data.message);
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
        throw new Error('Account creation failed');
      }
    } catch (err) {
      errorToast('Registration Failed', 'An unexpected error occurred. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize callback functions for each step to prevent re-creation
  const step1Callback = useCallback((isValid, data) => handleFormValid(1, isValid, data), [handleFormValid]);
  const step1MethodsCallback = useCallback((methods) => handleFormMethodsReady(1, methods), [handleFormMethodsReady]);

  const step2Callback = useCallback((isValid, data) => handleFormValid(2, isValid, data), [handleFormValid]);
  const step2MethodsCallback = useCallback((methods) => handleFormMethodsReady(2, methods), [handleFormMethodsReady]);

  const step3Callback = useCallback((isValid, data) => handleFormValid(3, isValid, data), [handleFormValid]);
  const step3MethodsCallback = useCallback((methods) => handleFormMethodsReady(3, methods), [handleFormMethodsReady]);

  const step4Callback = useCallback((isValid, data) => handleFormValid(4, isValid, data), [handleFormValid]);
  const step4MethodsCallback = useCallback((methods) => handleFormMethodsReady(4, methods), [handleFormMethodsReady]);

  const step5Callback = useCallback((isValid, data) => handleFormValid(5, isValid, data), [handleFormValid]);
  const step5MethodsCallback = useCallback((methods) => handleFormMethodsReady(5, methods), [handleFormMethodsReady]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStepForm
            onFormValid={step1Callback}
            onMethodsReady={step1MethodsCallback}
            initialData={formData.step1}
          />
        );
      case 2:
        return (
          <CompanyDetailsStepForm
            onFormValid={step2Callback}
            onMethodsReady={step2MethodsCallback}
            initialData={formData.step2}
            countries={countries}
          />
        );
      case 3:
        return userRole === 'owner' ? (
          <FleetInformationStepForm
            onFormValid={step3Callback}
            onMethodsReady={step3MethodsCallback}
            initialData={formData.step3}
          />
        ) : (
          <CharteringExperienceStepForm
            onFormValid={step3Callback}
            onMethodsReady={step3MethodsCallback}
            initialData={formData.step3}
          />
        );
      case 4:
        return (
          <RegistrationDocumentsStepForm
            onFormValid={step4Callback}
            onMethodsReady={step4MethodsCallback}
            userRole={userRole}
          />
        );
      case 5:
        return <IdentityVerificationStepForm onFormValid={step5Callback} onMethodsReady={step5MethodsCallback} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEPS.length;

  return (
    <div className="w-full">
      <Stepper
        steps={stepsState}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
        hideActionButtons={currentStep === 4}
        contentClassName="max-w-[51.5rem] w-full"
      >
        {renderStepContent()}
      </Stepper>
    </div>
  );
};

RegistrationForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape()),
  userRole: PropTypes.oneOf(['owner', 'charterer']).isRequired,
};

export default RegistrationForm;
