import PropTypes from 'prop-types';

import { NextImage } from '@/elements';

const IconComponent = ({ icon }) => (icon ? <NextImage src={icon} alt={`${icon} flag`} className="mr-1 h-4" /> : null);

IconComponent.defaultProps = {
  icon: '',
};

IconComponent.propTypes = {
  icon: PropTypes.string,
};

export default IconComponent;
