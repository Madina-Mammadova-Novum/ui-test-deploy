import { TextRowPropTypes } from '@/lib/types';

const TextRow = ({ title = '', children, className = '' }) => {
  return (
    <div className={`text-xsm text-black ${className}`}>
      <span className="font-normal mr-1">{title}:</span>
      <span className="font-bold">{children}</span>
    </div>
  );
};

TextRow.propTypes = TextRowPropTypes;

export default TextRow;
