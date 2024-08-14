import { IconComponentPropTypes } from '@/lib/types';

import { NextImage } from '@/elements';

const IconComponent = ({ icon = '' }) =>
  icon ? <NextImage src={icon} alt={`${icon} flag`} className="mr-1 inline h-4" /> : null;

IconComponent.propTypes = IconComponentPropTypes;

export default IconComponent;
