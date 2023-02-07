import React from 'react';

import classNames from 'classnames';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

const ContentElement = ({ content, customStyles }) => {
  if (!content) return null;

  return <div className={classNames('content-wrapper', customStyles)}>{parse(content)}</div>;
};

ContentElement.defaultProps = {
  content: null,
  customStyles: '',
};

ContentElement.propTypes = {
  content: PropTypes.string,
  customStyles: PropTypes.string,
};

export default ContentElement;
