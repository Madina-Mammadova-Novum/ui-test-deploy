import ReactPaginate from 'react-paginate';

import PropTypes from 'prop-types';

const PaginationComponent = ({ pageCount, onPageChange, currentPage, containerStyles }) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="<"
      pageLinkClassName="w-7 h-7 flex items-center justify-center"
      containerClassName={`flex justify-center items-center gap-1 list-none ${containerStyles}`}
      activeLinkClassName="font-medium shadow-xmd text-xsm text-blue border border-blue rounded-md"
      pageClassName="text-xsm font-medium text-black hover:text-blue w-7 h-7 cursor-pointer"
    />
  );
};

PaginationComponent.defaultProps = {
  containerStyles: '',
};

PaginationComponent.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  containerStyles: PropTypes.string,
};

export default PaginationComponent;
