import { ImoNotFoundPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const ImoNotFound = ({ q88 = {}, goBack = () => {} }) => {
  const imoNotFound = Object.keys(q88).length < 2;
  return (
    <div className="border border-gray-darker bg-gray-light rounded-md px-5 py-3 text-[12px] my-5">
      {imoNotFound && (
        <p>
          Unfortunately, the IMO of the Tanker you specified <b>{q88.imo}</b> was not found in our system, please add
          all the required information manually.
        </p>
      )}
      <p className="flex mt-1.5">
        If you make a mistake while entering the IMO of the tanker, please
        <Button
          buttonProps={{ text: 'go back', variant: 'primary', size: 'small' }}
          onClick={goBack}
          customStyles="!p-0 !text-[12px] !bg-transparent"
        />{' '}
        and try again.
      </p>
    </div>
  );
};

ImoNotFound.propTypes = ImoNotFoundPropTypes;

export default ImoNotFound;
