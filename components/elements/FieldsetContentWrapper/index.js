import { FieldsetContentWrapperPropTypes } from '@/lib/types';

const FieldsetContentWrapper = ({ children, className = '' }) => (
  <div className={`flex flex-col ${className}`}>{children}</div>
);

FieldsetContentWrapper.propTypes = FieldsetContentWrapperPropTypes;

export default FieldsetContentWrapper;
