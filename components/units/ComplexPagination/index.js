'use client';

import { memo } from 'react';

import { ComplexPaginationPropTypes } from '@/lib/types';

import { navigationPagesAdapter } from '@/adapters/navigation';
import { Dropdown } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { PaginationComponent } from '@/units';
import { getFilledArray } from '@/utils/helpers';

const ComplexPagination = ({
  currentPage,
  numberOfPages,
  onPageChange,
  onChangeOffers,
  perPage,
  onSelectedPageChange,
  label = 'offers',
}) => {
  const dropdownStyles = { dropdownWidth: 34, className: 'flex items-center gap-x-5 flex-wrap' };
  const pages = getFilledArray(numberOfPages)?.map(navigationPagesAdapter);

  return (
    pages.length > 0 && (
      <div className="relative mb-6 flex items-center justify-between 3md:items-center">
        <Dropdown
          value={{ label: perPage, value: perPage }}
          label={`${label} per page:`}
          placeholder="5"
          options={NAVIGATION_PARAMS.DATA_PER_PAGE}
          onChange={onChangeOffers}
          customStyles={dropdownStyles}
          menuPlacement="auto"
        />

        <div className="flex items-center">
          {numberOfPages > 0 && (
            <PaginationComponent currentPage={currentPage} pageCount={numberOfPages} onPageChange={onPageChange} />
          )}
        </div>
        <Dropdown
          label="Go to page:"
          placeholder="1"
          value={{ label: currentPage, value: currentPage }}
          options={pages}
          onChange={onSelectedPageChange}
          // eslint-disable-next-line
          customStyles={{ ...dropdownStyles, className: dropdownStyles.className + ' justify-end' }}
          menuPlacement="auto"
        />
      </div>
    )
  );
};

ComplexPagination.propTypes = ComplexPaginationPropTypes;

export default memo(ComplexPagination);
