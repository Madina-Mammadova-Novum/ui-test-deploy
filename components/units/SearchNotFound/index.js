import classnames from 'classnames';

import { SearchNotFoundTypes } from '@/lib/types';

import BoatSVG from '@/assets/images/boat.svg';

const SearchNotFound = ({ isAccountSearch = false }) => (
  <div className={classnames(isAccountSearch ? 'mb-4' : 'my-10', 'flex flex-col items-center')}>
    <BoatSVG />
    <p className="text-lg font-bold">No results found</p>
  </div>
);

SearchNotFound.propTypes = SearchNotFoundTypes;

export default SearchNotFound;
