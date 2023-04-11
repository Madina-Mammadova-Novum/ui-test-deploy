'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { SimpleSelect } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { PaginationComponent } from '@/units';
import { getFilledArray } from '@/utils/helpers';

const ComplexPagination = ({ page, perPage, totalPages, dataPerPage }) => {
  const [pagesStore, setPagesStore] = useState({
    currentPage: page ?? NAVIGATION_PARAMS.CURRENT_PAGE,
    perPages: perPage ?? NAVIGATION_PARAMS.PER_PAGES,
    pageCount: totalPages ?? NAVIGATION_PARAMS.TOTAL_PAGES,
    positonsPerPage: dataPerPage ?? NAVIGATION_PARAMS.DATA_PER_PAGE,
    pagesLength: getFilledArray(totalPages ?? NAVIGATION_PARAMS.PAGES_LENGTH),
  });

  /* state handler by key-value for pagesStore */
  const handleChangeState = (key, value) => {
    setPagesStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handlePageChange = ({ selected }) => handleChangeState('currentPage', selected + 1);
  const handlePerPageChange = (selected) => handleChangeState('perPages', selected);
  const handleSelectedPageChange = (selected) => handleChangeState('currentPage', selected);

  const { currentPage, perPages, pageCount, positonsPerPage, pagesLength } = pagesStore;

  return (
    <div className="flex justify-between mt-5">
      <SimpleSelect
        label="offers per page:"
        currentItem={perPages}
        selectableItems={positonsPerPage}
        onChange={handlePerPageChange}
      />
      <PaginationComponent currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
      <SimpleSelect
        label="Go to page:"
        currentItem={currentPage}
        selectableItems={pagesLength}
        onChange={handleSelectedPageChange}
      />
    </div>
  );
};

ComplexPagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalPages: PropTypes.number,
  dataPerPage: PropTypes.arrayOf(PropTypes.number),
};

export default ComplexPagination;
