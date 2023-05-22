'use client';

import { ComplexPaginationPropTypes } from '@/lib/types';

import { Dropdown } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { PaginationComponent } from '@/units';

const ComplexPagination = ({
  currentPage,
  numberOfPages,
  onPageChange,
  onChangeOffers,
  perPage,
  pages,
  onSelectedPageChange,
}) => {
  const dropdownStyles = { dropdownWidth: 34, className: 'flex items-center gap-x-5' };
  return (
    <div className="flex items-start 3md:items-center justify-between my-5 relative h-20 3md:h-auto">
      <Dropdown
        value={{ label: perPage, value: perPage }}
        label="offers per page:"
        placeholder="5"
        options={NAVIGATION_PARAMS.DATA_PER_PAGE}
        onChange={onChangeOffers}
        customStyles={dropdownStyles}
        menuPlacement="auto"
      />

      <div className="flex items-center absolute bottom-0 left-[50%] translate-x-[-50%] 3sm:translate-x-[unset] 3sm:position-unset">
        <PaginationComponent currentPage={currentPage} pageCount={numberOfPages} onPageChange={onPageChange} />
      </div>
      <Dropdown
        label="Go to page:"
        placeholder="1"
        value={{ label: currentPage, value: currentPage }}
        options={pages}
        onChange={onSelectedPageChange}
        customStyles={dropdownStyles}
        menuPlacement="auto"
      />
    </div>
  );
};

ComplexPagination.propTypes = ComplexPaginationPropTypes;

export default ComplexPagination;
