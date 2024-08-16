import { FieldsetContentPropTypes } from '@/lib/types';

const FieldsetContent = ({ label, children, className = '' }) => {
  return (
    <div className={className}>
      {label && <p className="pb-2.5 text-xs-sm font-semibold uppercase text-gray">{label}</p>}
      {children}
    </div>
  );
};

FieldsetContent.propTypes = FieldsetContentPropTypes;

export default FieldsetContent;
