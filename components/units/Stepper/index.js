'use client';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from '@/elements';

const StepIndicator = ({ step, currentStep, isCompleted }) => {
  const isActive = currentStep === step.id;
  const isDone = isCompleted || currentStep > step.id;

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <div className="flex items-center">
        <span className="text-xs font-medium text-black">STEP {step.id}</span>
      </div>

      <div className="w-full">
        <div className="h-1 overflow-hidden rounded-full bg-gray-darker">
          <div
            className={classNames(
              'h-full rounded-full transition-all duration-300 ease-in-out',
              isDone || isActive ? 'bg-blue' : 'bg-gray-darker'
            )}
            style={{ width: isDone ? '100%' : isActive ? '100%' : '0%' }}
          />
        </div>
      </div>

      <h2 className={classNames('text-xs font-semibold uppercase', isActive ? 'text-blue' : 'text-gray-400')}>
        {step.title}
      </h2>
    </div>
  );
};

const Stepper = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
  children,
  isLastStep,
  contentClassName = '',
  canProceed = true,
  isSubmitting = false,
}) => {
  return (
    <div className="flex h-full flex-col">
      {/* Step Indicators */}
      <div className="mb-8 md:mb-12">
        {/* Mobile: Show only current step */}
        <div className="flex justify-center md:hidden">
          {steps
            .filter((step) => step.id === currentStep)
            .map((step) => (
              <StepIndicator key={step.id} step={step} currentStep={currentStep} isCompleted={step.isCompleted} />
            ))}
        </div>

        {/* Desktop: Show all steps */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4">
          {steps.map((step) => (
            <StepIndicator key={step.id} step={step} currentStep={currentStep} isCompleted={step.isCompleted} />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className={classNames('mb-8 flex-1 md:mb-12', contentClassName)}>{children}</div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div>
          {currentStep > 1 && (
            <Button
              buttonProps={{
                text: 'Previous',
                variant: 'secondary',
                size: 'large',
              }}
              onClick={onPrevious}
              disabled={isSubmitting}
            />
          )}
        </div>

        <div>
          {isLastStep ? (
            <Button
              buttonProps={{
                text: isSubmitting ? 'Creating Account...' : 'Create Account',
                variant: 'primary',
                size: 'large',
              }}
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting}
              type="submit"
            />
          ) : (
            <Button
              buttonProps={{
                text: 'Next Step',
                variant: 'primary',
                size: 'large',
              }}
              onClick={onNext}
              // disabled={!canProceed || isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

StepIndicator.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool,
  }).isRequired,
  currentStep: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool,
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool,
    })
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
  contentClassName: PropTypes.string,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  canProceed: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default Stepper;
