import { TextRowPropTypes } from '@/lib/types';

import { Placeholder } from '@/elements';
import { isEmptyChildren } from '@/utils/helpers';

const TextRow = ({ title = '', children, className = '', inlineVariant = false }) => {
  return (
    <div
      className={`text-xsm text-black flex items-center ${
        inlineVariant && '[&>span:nth-child(2)]:!whitespace-pre-wrap [&>span:nth-child(2)]:!inline'
      } ${className}`}
    >
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
