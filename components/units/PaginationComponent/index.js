'use client';

import ReactPaginate from 'react-paginate';

import { PaginationComponentPropTypes } from '@/lib/types';

import AngleDownSVG from '@/assets/images/angleDown.svg';

const PaginationComponent = ({ currentPage, pageCount, onPageChange, containerStyles = '' }) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      onPageChange={onPageChange}
      pageLinkClassName="w-7 h-7 flex items-center justify-center"
      containerClassName={`flex justify-center items-center gap-1 list-none ${containerStyles}`}
      activeLinkClassName="font-medium shadow-xmd text-xsm text-blue border border-blue rounded-md"
      pageClassName="text-xsm font-medium text-black hover:text-blue w-7 h-7 cursor-pointer"
      breakLabel="..."
      nextLabel={
        <AngleDownSVG className={`-rotate-90 ${currentPage === pageCount ? 'fill-gray-darker' : 'fill-black'}`} />
      }
      previousLabel={<AngleDownSVG className={`rotate-90 ${currentPage === 1 ? 'fill-gray-darker' : 'fill-black'}`} />}
    />
  );
};

PaginationComponent.propTypes = PaginationComponentPropTypes;

export default PaginationComponent;
