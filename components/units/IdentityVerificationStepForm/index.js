'use client';

import React from 'react';

import PropTypes from 'prop-types';

const IdentityVerificationStepForm = ({ onFormValid, onMethodsReady }) => {
  // Since this step doesn't have a form, we notify parent that it's always valid
  React.useEffect(() => {
    if (onFormValid) {
      onFormValid(true, {});
    }
    if (onMethodsReady) {
      onMethodsReady({ trigger: () => Promise.resolve(true) });
    }
  }, [onFormValid, onMethodsReady]);

  return (
    <div className="flex items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-gray-900">Hello World</h1>
    </div>
  );
};

IdentityVerificationStepForm.propTypes = {
  onFormValid: PropTypes.func,
  onMethodsReady: PropTypes.func,
};

export default IdentityVerificationStepForm;
