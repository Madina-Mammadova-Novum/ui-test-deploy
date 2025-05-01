'use client';

import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { InputErrorMessage, Label } from '@/elements';
import { SCREENS } from '@/lib/constants';
import { useMediaQuery } from '@/utils/hooks';

const OTPInputSlot = React.forwardRef(({ value, isFocused, onChange, onKeyDown, onFocus, onBlur, onPaste }, ref) => {
  return (
    <div
      className={classNames(
        'relative flex h-12 w-10 items-center justify-center',
        'transition-all duration-100',
        'rounded-md border border-gray-darker',
        'hover:border-2',
        {
          'border-2 !border-blue': isFocused,
        }
      )}
    >
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onPaste={onPaste}
        className="absolute inset-0 h-full w-full rounded-md bg-transparent text-center text-lg outline-none"
      />
      <div className="pointer-events-none text-lg font-medium">{value}</div>
    </div>
  );
});

OTPInputSlot.displayName = 'OTPInputSlot';

const OTPInput = ({
  label,
  labelBadge,
  error,
  length = 6,
  value = '',
  onChange,
  shouldFocus = true,
  separator = false,
  disabled = false,
  name,
}) => {
  const [otp, setOtp] = useState(value.split('').concat(Array(length - value.length).fill('')));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  // Check if screen is small using media query
  const isSmallScreen = useMediaQuery(SCREENS.SM);

  // Use separator only if it's enabled and not on small screens
  const shouldShowSeparator = separator && !isSmallScreen;

  // Update OTP when external value changes
  useEffect(() => {
    if (value !== otp.join('')) {
      setOtp(value.split('').concat(Array(length - value.length).fill('')));
    }
  }, [value, length, otp]);

  // Handle initial focus
  useEffect(() => {
    if (shouldFocus && inputRefs.current.length) {
      // Find first empty slot, or focus on last digit if all filled
      const emptyIndex = otp.findIndex((digit) => !digit);
      const indexToFocus = emptyIndex === -1 ? length - 1 : emptyIndex;

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        inputRefs.current[indexToFocus]?.focus();
      }, 50);
    }
  }, [shouldFocus, otp, length]);

  const handleChange = (e, index) => {
    const newVal = e.target.value;

    // Only accept digits
    if (newVal.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = newVal;
      setOtp(newOtp);

      // Update parent component
      onChange?.(newOtp.join(''));

      // Auto-advance to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // If there's a value, clear it
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
      } else if (index > 0) {
        // If empty, move to previous input
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.slice(0, length).replace(/[^0-9]/g, '');

    if (pastedOtp) {
      const newOtp = pastedOtp.split('').concat(Array(length - pastedOtp.length).fill(''));
      setOtp(newOtp);
      onChange?.(newOtp.join(''));

      // Focus the next empty slot or the last slot
      const targetIndex = Math.min(pastedOtp.length, length - 1);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className={classNames(disabled && 'cursor-not-allowed opacity-50')}>
      {label && (
        <Label
          name={name}
          className={classNames('mb-0.5 block whitespace-nowrap text-left text-xs-sm', {
            'flex items-center gap-1': labelBadge,
          })}
        >
          {label} {labelBadge}
        </Label>
      )}

      <div className="flex items-center justify-center gap-2">
        {shouldShowSeparator ? (
          // With separator (groups of 3)
          Array.from({ length: Math.ceil(length / 3) }, (_, groupIndex) => {
            const startIndex = groupIndex * 3;
            const endIndex = Math.min(startIndex + 3, length);

            return (
              <React.Fragment key={groupIndex}>
                {groupIndex > 0 && (
                  <div className="flex w-4 items-center justify-center">
                    <div className="h-1 w-2 rounded-full bg-gray-darker" />
                  </div>
                )}

                <div className="flex gap-2">
                  {Array.from({ length: endIndex - startIndex }, (unused, i) => {
                    const index = startIndex + i;
                    return renderInputSlot(index);
                  })}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          // Without separator (all in a row)
          <div className="flex gap-2">{Array.from({ length }, (unused, index) => renderInputSlot(index))}</div>
        )}
      </div>

      {error && <InputErrorMessage message={error} />}
    </div>
  );

  // Helper function to render input slots
  function renderInputSlot(index) {
    return (
      <OTPInputSlot
        key={index}
        ref={(el) => {
          if (el) inputRefs.current[index] = el;
        }}
        value={otp[index]}
        isFocused={index === focusedIndex}
        onChange={(e) => handleChange(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        onPaste={(e) => handlePaste(e)}
      />
    );
  }
};

OTPInput.propTypes = {
  label: PropTypes.string,
  labelBadge: PropTypes.node,
  error: PropTypes.string,
  length: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  shouldFocus: PropTypes.bool,
  separator: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

OTPInputSlot.propTypes = {
  value: PropTypes.string,
  isFocused: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPaste: PropTypes.func,
};

export default OTPInput;
