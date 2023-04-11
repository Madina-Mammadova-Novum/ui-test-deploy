'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { navigationPagesAdapter } from '@/adapters/navigation';
import { Dropdown } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { PaginationComponent } from '@/units';
import { getFilledArray } from '@/utils/helpers';

const ComplexPagination = ({ page, totalPages, dataPerPage }) => {
  const [pagesStore, setPagesStore] = useState({
    currentPage: page ?? NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: dataPerPage ?? NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
    pages: getFilledArray(totalPages ?? NAVIGATION_PARAMS.PAGES_LENGTH).map(navigationPagesAdapter),
  });

  /* state handler by key-value for pagesStore */
  const handleChangeState = (key, value) => {
    setPagesStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handlePageChange = ({ selected }) => handleChangeState('currentPage', selected + 1);
  const handlePerPageChange = ({ value }) => handleChangeState('perPage', value);
  const handleSelectedPageChange = ({ value }) => handleChangeState('currentPage', value);

  const { currentPage, pages } = pagesStore;

  const dropdownStyles = { dropdownWidth: 34, className: 'flex items-center gap-x-5' };

  return (
    <div className="flex justify-between mt-5">
      <Dropdown
        label="offers per page:"
        placeholder="5"
        options={NAVIGATION_PARAMS.DATA_PER_PAGE}
        onChange={handlePerPageChange}
        customStyles={dropdownStyles}
        config={{ sync: true }}
      />
      <PaginationComponent currentPage={currentPage} pageCount={pages.length} onPageChange={handlePageChange} />
      <Dropdown
        label="Go to page:"
        placeholder="1"
        options={pages}
        onChange={handleSelectedPageChange}
        customStyles={dropdownStyles}
        config={{ sync: true }}
      />
    </div>
  );
};

ComplexPagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.number, value: PropTypes.number })),
  totalPages: PropTypes.number,
  dataPerPage: PropTypes.arrayOf(PropTypes.number),
};

export default ComplexPagination;
