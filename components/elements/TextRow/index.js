import { TextRowPropTypes } from '@/lib/types';

const TextRow = ({ title = '', children, className = '' }) => {
  return (
    <div className={`text-xsm text-black ${className}`}>
      <span className="font-normal mr-1">{title}:</span>
      <span className="font-bold">{children}</span>
{/* =======
      <span className="font-normal">{title}:</span>
      <span className="font-bold ml-1">{children}</span>
>>>>>>> 48e87567941281d27c068f24b6be754e65ea3ca0 */}
    </div>
  );
};

TextRow.propTypes = TextRowPropTypes;

export default TextRow;
