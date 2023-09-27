import BoatSVG from '@/assets/images/boat.svg';

const SearchNotFound = () => (
  <div className="flex flex-col items-center my-10">
    <BoatSVG />
    <p className="font-bold text-lg">No results found</p>
  </div>
);

export default SearchNotFound;
