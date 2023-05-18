import { TextRowPropTypes } from '@/lib/types';

const TextRow = ({ title = '', children, className = '' }) => {
  return (
    <div className={`text-xsm text-black ${className}`}>
      <span className="font-normal">{title}:</span>
      <span className="font-bold ml-1">{children}</span>
    </div>
  );
};

TextRow.propTypes = TextRowPropTypes;

export default TextRow;
