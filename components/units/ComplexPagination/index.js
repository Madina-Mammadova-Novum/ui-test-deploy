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
    <div className="flex items-start 3md:items-center justify-between my-5 relative h-20 3md:h-auto">
      <Dropdown
        label="offers per page:"
        placeholder="5"
        defaultValue={NAVIGATION_PARAMS.DATA_PER_PAGE[0]}
        options={NAVIGATION_PARAMS.DATA_PER_PAGE}
        onChange={handlePerPageChange}
        customStyles={dropdownStyles}
      />
      <div className="flex items-center absolute bottom-0 left-[50%] translate-x-[-50%] 3md:translate-x-[unset] 3md:position-unset">
        <PaginationComponent currentPage={currentPage} pageCount={pages.length} onPageChange={handlePageChange} />
      </div>
      <Dropdown
        label="Go to page:"
        placeholder="1"
        defaultValue={pages[currentPage - 1]}
        options={pages}
        value={pages[currentPage - 1]}
        onChange={handleSelectedPageChange}
        customStyles={dropdownStyles}
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
