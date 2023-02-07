import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const BlockShortDescription = ({ shortDescription, customStyles }) => {
  if (!shortDescription) return null;

  return (
    <p
      className={classNames(
        'text-gray text-lg leading-[23px] font-normal w-full 2lg:text-xl lg:leading-[26px] lg:max-w-[738px]',
        customStyles
      )}
    >
      {shortDescription}
    </p>
  );
};

BlockShortDescription.defaultProps = {
  shortDescription: null,
  customStyles: '',
};

BlockShortDescription.propTypes = {
  shortDescription: PropTypes.string,
  customStyles: PropTypes.string,
};

export default BlockShortDescription;
