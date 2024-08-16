import { InformationRowPropTypes } from '@/lib/types';

import { NextImage } from '@/elements';

const InformationRow = ({ iconProps = {}, keyText = '', label = '' }) => {
  const { src = '', alt = '' } = iconProps;

  return (
    <div className="flex">
      <span className="whitespace-nowrap">{keyText}</span>
      <span className="ml-1 flex items-center font-semibold">
        {src && <NextImage src={src} alt={alt} customStyles="mr-1.5 h-[15px]" />} {label}
      </span>
    </div>
  );
};

InformationRow.propTypes = InformationRowPropTypes;

export default InformationRow;
