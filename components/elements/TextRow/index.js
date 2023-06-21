import { TextRowPropTypes } from '@/lib/types';

import { Placeholder } from '@/elements';
import { isEmptyChildren } from '@/utils/helpers';

const TextRow = ({ title = '', children, className = '' }) => {
  return (
    <div className={`text-xsm text-black ${className}`}>
      <span className="font-normal mr-1">{title}:</span>
      {isEmptyChildren(children) ? (
        <span className="font-bold inline-flex items-center whitespace-nowrap">{children}</span>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

TextRow.propTypes = TextRowPropTypes;

export default TextRow;
