import { TextRowPropTypes } from '@/lib/types';

const TextRow = ({ title = '', children }) => {
  return (
    <div className="text-xsm text-black">
      <span className="font-normal whitespace-nowrap">{title}:</span>
      <span className="font-bold ml-1">{children}</span>
    </div>
  );
};

TextRow.propTypes = TextRowPropTypes;

export default TextRow;
