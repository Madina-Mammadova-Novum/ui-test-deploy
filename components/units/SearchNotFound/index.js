import BoatSVG from '@/assets/images/boat.svg';

const SearchNotFound = () => (
  <div className="my-10 flex flex-col items-center">
    <BoatSVG />
    <p className="text-lg font-bold">No results found</p>
  </div>
);

export default SearchNotFound;
