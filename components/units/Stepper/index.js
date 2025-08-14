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
            className={classNames('h-full rounded-full transition-all duration-300 ease-in-out', {
              'bg-blue': isDone && !isActive,
              'bg-yellow': isActive,
              'bg-gray-darker': !isDone && !isActive,
            })}
            style={{ width: isDone ? '100%' : isActive ? '100%' : '0%' }}
          />
        </div>
      </div>

      <h2
        className={classNames('text-xs font-semibold uppercase', {
          'text-blue': isDone && !isActive,
          'text-yellow': isActive,
          'text-gray-darker': !isDone && !isActive,
        })}
      >
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
  children,
  isLastStep,
  contentClassName = '',
  isSubmitting = false,
  hideActionButtons = false,
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
        <div className="hidden md:grid md:grid-cols-5 md:gap-4">
          {steps.map((step) => (
            <StepIndicator key={step.id} step={step} currentStep={currentStep} isCompleted={step.isCompleted} />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className={classNames('mb-8 flex-1 md:mb-12', contentClassName)}>{children}</div>

      {/* Action Buttons */}
      {!hideActionButtons && (
        <div className="grid w-full max-w-[824px] grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
          {currentStep > 1 && (
            <Button
              buttonProps={{
                text: 'Previous Step',
                variant: 'tertiary',
                size: 'large',
              }}
              customStyles="w-full !border-blue !text-blue hover:!border-blue-darker hover:!text-blue-darker"
              customStylesFromWrap="w-full order-2 md:order-1"
              onClick={onPrevious}
              disabled={isSubmitting}
            />
          )}

          <Button
            buttonProps={{
              text:
                currentStep === 3 ? (isSubmitting ? 'Loading...' : 'Next Step') : isLastStep ? 'Complete' : 'Next Step',
              variant: 'primary',
              size: 'large',
            }}
            onClick={onNext}
            customStyles="w-full"
            customStylesFromWrap="w-full order-1 md:order-2"
            disabled={isSubmitting}
            type={isLastStep ? 'submit' : 'button'}
          />
        </div>
      )}
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
  children: PropTypes.node.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool,
  hideActionButtons: PropTypes.bool,
};

export default Stepper;
