import classNames from 'classnames';

import { SearchNotFoundTypes } from '@/lib/types';

import BoatSVG from '@/assets/images/boat.svg';

const SearchNotFound = ({ isAccountSearch = false, isDisabled = false }) => (
  <div className={classNames(isAccountSearch ? 'mb-4' : 'my-10', 'flex flex-col items-center')}>
    <BoatSVG />
    <p className="text-lg font-bold">
      {isDisabled ? 'Your saved search criteria include outdated laycan dates.' : 'No results found'}
    </p>
    {isDisabled && (
      <p className="text-lg font-bold">Begin a new search with updated laycan dates to see available options.</p>
    )}
  </div>
);

SearchNotFound.propTypes = SearchNotFoundTypes;

export default SearchNotFound;
