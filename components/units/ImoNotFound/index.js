import { ImoNotFoundPropTypes } from '@/lib/types';

const ImoNotFound = ({ q88 = {} }) => {
  return (
    <div className="border border-gray-darker bg-gray-light rounded-md px-5 py-3 text-xs-sm">
      <p>
        Unfortunately, the IMO of the Tanker you specified <b>{q88.imo}</b> was not found in our system, please add all
        the required information manually.
      </p>
    </div>
  );
};

ImoNotFound.propTypes = ImoNotFoundPropTypes;

export default ImoNotFound;
