'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';
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
import {
  clearPhoneValidationState,
  focusFirstFormElement,
  getFieldFromKeyForRegistration,
  scrollToFirstError,
  setCookie,
} from '@/utils/helpers';
import { errorToast, redirectAfterToast } from '@/utils/hooks';

const STEPS = [
  { id: 1, title: 'User Details', isCompleted: false },
  { id: 2, title: 'Company Details', isCompleted: false },
  { id: 3, title: 'Fleet Information', isCompleted: false },
  { id: 4, title: 'Registration Documents', isCompleted: false },
  { id: 5, title: 'Identity Verification', isCompleted: false },
];

// Helper functions for sessionStorage
const setSessionStorage = (key, data) => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getSessionStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (error) {
    // If there's an error parsing, remove the corrupted item
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(key);
    }
    return null;
  }
};

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

const RegistrationForm = ({ countries, userRole = 'charterer', onStepChange }) => {
  const config = ROLE_CONFIG[userRole];
  const searchParams = useSearchParams();

  // Use useMemo to recalculate steps when userRole changes
  const steps = useMemo(
    () => STEPS.map((step) => (step.id === 3 ? { ...step, title: config.step3Title } : step)),
    [config.step3Title]
  );

  // Mapping of error field names to their corresponding steps
  const fieldToStepMapping = useMemo(
    () => ({
      // Step 1 fields (Personal Details)
      firstName: 1,
      lastName: 1,
      email: 1,
      userPhone: 1,
      password: 1,
      confirmPassword: 1,
      phoneVerified: 1,

      // Step 2 fields (Company Details)
      companyName: 2,
      phone: 2,
      samePhone: 2,
      registeredAddress: 2,
      registeredCity: 2,
      registeredState: 2,
      registeredCountry: 2,
      registeredPostalCode: 2,
      operatingAddress: 2,
      operatingCity: 2,
      operatingState: 2,
      operatingCountry: 2,
      operatingPostalCode: 2,
      sameAddresses: 2,

      // Step 3 fields (Fleet/Chartering Experience)
      companyYearsOfOperation: 3,
      numberOfTankers: 3,
      numberOfCargoes: 3,
      imos: 3,
      cargoes: 3,
      termsAndConditions: 3,
      captcha: 3,
    }),
    []
  );

  // Check URL parameters to determine initial step
  const redirectUrl = searchParams.get('redirectUrl');
  const shouldStartAtStep5 = redirectUrl;

  const [currentStep, setCurrentStep] = useState(shouldStartAtStep5 ? 5 : 1);

  // Initialize steps state with completed steps if starting at step 5
  const initialStepsState = shouldStartAtStep5 ? steps.map((step) => ({ ...step, isCompleted: step.id < 5 })) : steps;

  const [stepsState, setStepsState] = useState(initialStepsState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingFromStorage, setIsLoadingFromStorage] = useState(!shouldStartAtStep5);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {}, // This will not be saved to sessionStorage
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

  // State to hold server errors that need to be displayed
  const [serverErrors, setServerErrors] = useState({});

  // Load saved data from sessionStorage on mount (excluding step 3 and when starting at step 5)
  useEffect(() => {
    // Skip sessionStorage loading if starting directly at step 5
    if (shouldStartAtStep5) {
      setIsLoadingFromStorage(false);
      return;
    }

    try {
      const savedData = getSessionStorage(config.storageKey);
      if (savedData) {
        // Only load steps 1, 2, 4, 5 from sessionStorage
        setFormData((prev) => ({
          ...prev,
          step1: savedData.step1 || {},
          step2: savedData.step2 || {},
          // step3 intentionally excluded
          step4: savedData.step4 || {},
          step5: savedData.step5 || {},
        }));
      }
    } catch (error) {
      // Mark loading as complete regardless of success/failure
    } finally {
      // Mark loading as complete regardless of success/failure
      setIsLoadingFromStorage(false);
    }
  }, [config.storageKey, shouldStartAtStep5]);

  // Save data to sessionStorage whenever formData changes (excluding step 3)
  useEffect(() => {
    // Only save to sessionStorage after initial loading is complete
    if (isLoadingFromStorage) {
      return;
    }

    const dataToSave = {
      step1: formData.step1,
      step2: formData.step2,
      // step3 intentionally excluded from sessionStorage
      step4: formData.step4,
      step5: formData.step5,
    };

    setSessionStorage(config.storageKey, dataToSave);
  }, [formData.step1, formData.step2, formData.step4, formData.step5, config.storageKey, isLoadingFromStorage]);

  useEffect(() => {
    // Effect for userRole changes
  }, [userRole]);

  // Update stepsState when steps change (i.e., when userRole changes)
  useEffect(() => {
    setStepsState(steps);
  }, [steps]);

  // Add effect to track stepsState changes
  useEffect(() => {
    // Effect for stepsState changes
  }, [stepsState]);

  // Reset only step 3 data and form methods when userRole changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      step3: {}, // Reset step 3 data but don't save to sessionStorage
    }));
    setStepFormMethods((prev) => ({
      ...prev,
      step3: null,
    }));

    // Clear phone validation state from sessionStorage when switching roles
    // to prevent validation data from one role being used for another
    clearPhoneValidationState('registration', userRole);
  }, [userRole]);

  const handleFormMethodsReady = useCallback((stepNumber, methods) => {
    setStepFormMethods((prev) => ({
      ...prev,
      [`step${stepNumber}`]: methods,
    }));
  }, []);

  const handleFormValid = useCallback((stepNumber, isValid, data) => {
    // For step 3, only update the in-memory formData, don't trigger sessionStorage save
    if (stepNumber === 3) {
      setFormData((prev) => ({
        ...prev,
        step3: data,
      }));
    } else {
      // For other steps, update formData which will trigger sessionStorage save
      setFormData((prev) => {
        const currentData = prev[`step${stepNumber}`];
        // Simple shallow comparison for data changes
        if (
          currentData === data ||
          (currentData && Object.keys(currentData).length === Object.keys(data || {}).length)
        ) {
          let isEqual = true;
          for (const key in data || {}) {
            if (currentData[key] !== data[key]) {
              isEqual = false;
              break;
            }
          }
          if (isEqual) return prev;
        }

        const newFormData = {
          ...prev,
          [`step${stepNumber}`]: data,
        };

        return newFormData;
      });
    }

    // Update step completion status
    setStepsState((prev) => {
      const stepToUpdate = prev.find((step) => step.id === stepNumber);
      if (stepToUpdate && stepToUpdate.isCompleted === isValid) return prev;
      return prev.map((step) => (step.id === stepNumber ? { ...step, isCompleted: isValid } : step));
    });
  }, []); // Remove isLoadingFromStorage to prevent callback recreation

  // Helper function to navigate to the step containing the error field and focus on it
  const handleErrorNavigation = useCallback(
    (errorFieldName) => {
      const targetStep = fieldToStepMapping[errorFieldName];
      if (targetStep && targetStep !== currentStep) {
        setCurrentStep(targetStep);

        // Reset completion status for steps > the target step
        setStepsState((prev) =>
          prev.map((step) => ({
            ...step,
            isCompleted: step.id <= targetStep ? step.isCompleted : false,
          }))
        );

        // Wait for the step to render, then focus on the error field
        setTimeout(() => {
          const errorField =
            document.querySelector(`[name="${errorFieldName}"]`) ||
            document.querySelector(`[name*="${errorFieldName}"]`) ||
            document.querySelector(`#${errorFieldName}`) ||
            document.querySelector(`label[for="${errorFieldName}"]`);

          if (errorField) {
            errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (errorField.focus) {
              errorField.focus();
            }
          }
        }, 100);
      }
    },
    [fieldToStepMapping, currentStep]
  );

  const handleAccountCreation = useCallback(async () => {
    setIsSubmitting(true);

    try {
      // Get step 3 data directly from form methods instead of sessionStorage
      const step3FormMethods = stepFormMethods.step3;
      const step3Data = step3FormMethods ? step3FormMethods.getValues() : {};

      // Combine all form data with fresh step 3 data from form
      const combinedData = {
        ...formData.step1,
        ...formData.step2,
        ...step3Data, // Use fresh form values for step 3
      };

      const { error } = await config.signUpService({ data: combinedData });

      if (!error) {
        setCookie('session-user-email', combinedData.email);

        // Clear saved data on successful registration (step 3 wasn't saved anyway)
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.removeItem(config.storageKey);
        }

        // Clear phone validation state from sessionStorage
        clearPhoneValidationState('registration', userRole);

        // Don't redirect yet, let user proceed to steps 4 and 5
        return true; // Success
      }

      const errorKeys = Object.keys(error?.errors || {});

      if (errorKeys.length > 0) {
        // Convert first error field to lowercase first letter
        const originalFirstErrorField = errorKeys[0];
        const firstErrorField = originalFirstErrorField.charAt(0).toLowerCase() + originalFirstErrorField.slice(1);

        // Navigate to the first error field's step
        handleErrorNavigation(firstErrorField);

        // Store server errors in state to pass to step components
        const processedServerErrors = {};
        errorKeys.forEach((originalKey) => {
          const processedKey = originalKey.charAt(0).toLowerCase() + originalKey.slice(1);
          const fieldErrors = error.errors[originalKey];
          const errorMessage = Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors;

          // Store both original and processed keys
          processedServerErrors[processedKey] = errorMessage;
          if (processedKey !== originalKey) {
            processedServerErrors[originalKey] = errorMessage;
          }
        });

        setServerErrors(processedServerErrors);

        // Clear server errors after a delay to allow for user interaction
        setTimeout(() => {
          setServerErrors({});
        }, 10000); // Clear after 10 seconds

        // Show error message in toast
        const errorMessages = errorKeys
          .map((key) => {
            const fieldErrors = error.errors[key];
            return `${getFieldFromKeyForRegistration(key)}: ${fieldErrors.join(', ')}`;
          })
          .join('\n \n');

        errorToast('Validation Error', errorMessages);
      } else {
        // Generic error without specific field errors
        errorToast(error?.title, error?.message);
      }

      return false; // Validation error - don't proceed
    } catch (err) {
      errorToast('Registration Failed', 'An unexpected error occurred. Please try again.');
      return false; // Unexpected error - don't proceed
    } finally {
      setIsSubmitting(false);
    }
  }, [
    stepFormMethods,
    formData.step1,
    formData.step2,
    config.signUpService,
    config.storageKey,
    handleErrorNavigation,
    fieldToStepMapping,
  ]);

  const handleNext = useCallback(async () => {
    // Get the current step's form methods
    const currentFormMethods = stepFormMethods[`step${currentStep}`];

    if (!currentFormMethods) {
      return;
    }

    // Trigger form validation and submission
    const isValid = await currentFormMethods.trigger();

    if (isValid) {
      // If we're on step 3, create the account before proceeding
      if (currentStep === 3) {
        const accountCreated = await handleAccountCreation();
        if (!accountCreated) {
          // Account creation failed or had validation errors
          // handleAccountCreation already handled error navigation and toasts
          return;
        }
      }

      // Form is valid, proceed to next step or complete registration
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          // Focus first form element after step change
          focusFirstFormElement(200);
          return nextStep;
        });
      } else {
        // Final step completion - redirect to getting started
        Promise.resolve(redirectAfterToast('Welcome to Ship.Link!', ROUTES.GETTING_STARTED));
      }
    } else if (currentFormMethods?.formState?.errors) {
      // Form has validation errors - scroll to first error
      scrollToFirstError(currentFormMethods.formState.errors);
    }
  }, [currentStep, stepFormMethods, handleAccountCreation]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        const prevStep = prev - 1;

        // Reset completion status for steps > the target step
        // Keep completion status for steps <= the target step
        setStepsState((stepsStatePrev) => {
          const newStepsState = stepsStatePrev.map((step) => ({
            ...step,
            isCompleted: step.id <= prevStep ? step.isCompleted : false,
          }));

          return newStepsState;
        });

        // Focus first form element after step change
        focusFirstFormElement(200);
        return prevStep;
      }
      return prev;
    });
  }, []); // Remove currentStep from dependencies to avoid stale closures

  // Add effect to track currentStep changes and notify parent
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

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
    // Don't render forms until sessionStorage loading is complete
    if (isLoadingFromStorage) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading session data...</div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStepForm
            onFormValid={step1Callback}
            onMethodsReady={step1MethodsCallback}
            initialData={formData.step1}
            serverErrors={serverErrors}
          />
        );
      case 2:
        return (
          <CompanyDetailsStepForm
            onFormValid={step2Callback}
            onMethodsReady={step2MethodsCallback}
            initialData={formData.step2}
            countries={countries}
            serverErrors={serverErrors}
          />
        );
      case 3:
        return userRole === 'owner' ? (
          <FleetInformationStepForm
            onFormValid={step3Callback}
            onMethodsReady={step3MethodsCallback}
            initialData={{}} // Always use empty initial data for step 3
            serverErrors={serverErrors}
          />
        ) : (
          <CharteringExperienceStepForm
            onFormValid={step3Callback}
            onMethodsReady={step3MethodsCallback}
            initialData={{}} // Always use empty initial data for step 3
            serverErrors={serverErrors}
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
        hideActionButtons={currentStep === 4 || currentStep === 5}
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
  onStepChange: PropTypes.func,
};

export default RegistrationForm;
