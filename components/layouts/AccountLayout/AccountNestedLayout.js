'use client';

import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { AccountNestedLayoutPropTypes } from '@/lib/types';

import { Dropdown, Label, Title } from '@/elements';
import { AccountWrapper } from '@/modules';
import FleetsActions from '@/modules/FleetsActions';
import { ComplexPagination, ToggleRows } from '@/units';

const AccountNestedLayout = ({ children, config }) => {
  const { data, pagination, sorting, onToggle, withActions = false } = config;

  const searchedParams = usePathname();
  const existedId = searchedParams?.split('/')[3];

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  const printActions = useMemo(() => {
    if (sorting?.options?.length) {
      return (
        <div className="flex justify-end gap-x-5">
          <ToggleRows onToggleClick={onToggle} />
          <Dropdown
            label="Sort by open day:"
            options={sorting?.options}
            onChange={sorting?.onChange}
            defaultValue={sorting?.value}
            customStyles={dropdownStyles}
          />
        </div>
      );
    }

    if (withActions) {
      return (
        <div className="flex flex-col-reverse gap-y-5 items-end 3md:items-center 3md:flex-row gap-x-5">
          <ToggleRows onToggleClick={onToggle} />
          <FleetsActions />
        </div>
      );
    }

    return <ToggleRows onToggleClick={onToggle} />;
  }, [onToggle, sorting, withActions]);

  return (
    <div className="px-5">
      <section className="flex min-h-[90vh] flex-col gap-y-5">
        <div className="flex justify-between items-center pt-5">
          <div className="flex flex-col">
            <Label className="text-xs-sm">{data.label}</Label>
            <Title level="1">{data.title}</Title>
          </div>
          {printActions}
        </div>
        <AccountWrapper>{children}</AccountWrapper>
        {!existedId && (
          <ComplexPagination
            label="offers"
            perPage={pagination.perPage}
            currentPage={pagination.currentPage}
            numberOfPages={pagination.totalPages}
            onPageChange={pagination.handlePageChange}
            onSelectedPageChange={pagination.handleSelectedPageChange}
            onChangeOffers={pagination.onChangeOffers}
          />
        )}
      </section>
    </div>
  );
};

AccountNestedLayout.propTypes = AccountNestedLayoutPropTypes;

export default AccountNestedLayout;
