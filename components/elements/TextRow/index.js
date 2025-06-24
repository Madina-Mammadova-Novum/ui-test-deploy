import { TextRowPropTypes } from '@/lib/types';

import { Placeholder } from '@/elements';
import { isEmptyChildren } from '@/utils/helpers';

const TextRow = ({ title = '', children, className = '', inlineVariant = false }) => {
  return (
    <div
      className={`flex flex-wrap items-center text-xsm text-black ${
        inlineVariant && '[&>span:nth-child(2)]:!inline [&>span:nth-child(2)]:!whitespace-pre-wrap'
      } ${className}`}
    >
      <span className="mr-1 font-normal">{title}:</span>
      {isEmptyChildren(children) ? (
        <span className="inline-flex items-center break-words font-bold">{children}</span>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

TextRow.propTypes = TextRowPropTypes;

export default TextRow;
