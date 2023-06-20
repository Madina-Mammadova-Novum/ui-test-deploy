import { FieldsetContentPropTypes } from '@/lib/types';

const FieldsetContent = ({ label, children, className = '' }) => {
  return (
    <div className={className}>
      {label && <p className="text-gray font-semibold text-xs-sm uppercase pb-2.5">{label}</p>}
      {children}
    </div>
  );
};

FieldsetContent.propTypes = FieldsetContentPropTypes;

export default FieldsetContent;
