import { DividerPropTypes } from '@/lib/types';

const Divider = ({ className = '' }) => <hr className={`${className} h-px bg-gray-darker`} />;

Divider.propTypes = DividerPropTypes;

export default Divider;
