import { memo } from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import { CheckBox } from '@/elements';

const TermsAndConditions = memo(({ checked, onChange, containerClass }) => {
  return (
    <div className={`col-span-2 row-auto ${containerClass}`}>
      <CheckBox
        label="I agree with all"
        checked={checked}
        onChange={onChange}
        labelStyles="text-black inline-flex gap-1 text-xsm"
      >
        <p>
          <Link href="/policy" className="text-blue underline">
            Privacy Policy
          </Link>
          <span className="px-1.5">and</span>
          <Link href="/terms" className="text-blue underline">
            Terms of Use
          </Link>
        </p>
      </CheckBox>
    </div>
  );
});

TermsAndConditions.defaultProps = {
  containerClass: '',
};

TermsAndConditions.propTypes = {
  containerClass: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TermsAndConditions;
