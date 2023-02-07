import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const BlockTitle = ({ title, customStyles }) => {
  if (!title) return null;

  return (
    <h2
      className={classNames(
        'text-black text-[26px] leading-[34px] mb-5 font-bold w-full sm:text-[42px] sm:leading-[50px] lg:mb-6 lg:text-[55px] lg:leading-[66px] lg:max-w-[848px]',
        customStyles
      )}
    >
      {title}
    </h2>
  );
};

BlockTitle.defaultProps = {
  title: null,
  customStyles: '',
};

BlockTitle.propTypes = {
  title: PropTypes.string,
  customStyles: PropTypes.string,
};

export default BlockTitle;
