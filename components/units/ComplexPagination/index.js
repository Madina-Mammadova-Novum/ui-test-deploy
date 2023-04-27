'use client';

import { useState } from 'react';

import { ComplexPaginationPropTypes } from '@/lib/types';

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
    <div className="flex items-start 3sm:items-center justify-between my-5 relative h-20 3sm:h-auto">
      <Dropdown
        label="offers per page:"
        placeholder="5"
        defaultValue={NAVIGATION_PARAMS.DATA_PER_PAGE[0]}
        options={NAVIGATION_PARAMS.DATA_PER_PAGE}
        onChange={handlePerPageChange}
        customStyles={dropdownStyles}
      />
      <div className="flex items-center absolute bottom-0 left-[50%] translate-x-[-50%] 3sm:translate-x-[unset] 3sm:position-unset">
        <PaginationComponent currentPage={currentPage} pageCount={pages.length} onPageChange={handlePageChange} />
      </div>
      <Dropdown
        label="Go to page:"
        placeholder="1"
        defaultValue={pages[currentPage - 1]}
        options={pages}
        onChange={handleSelectedPageChange}
        customStyles={dropdownStyles}
      />
    </div>
  );
};

ComplexPagination.propTypes = ComplexPaginationPropTypes;

export default ComplexPagination;
