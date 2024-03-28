'use client';

import { useEffect, useMemo } from 'react';

import { useParams } from 'next/navigation';

import { AccountNestedLayoutPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/angleDouble.svg';
import { Dropdown, Label, NextLink, Title } from '@/elements';
import { AccountWrapper } from '@/modules';
import FleetsActions from '@/modules/FleetsActions';
import { ComplexPagination, ToggleRows } from '@/units';

const AccountNestedLayout = ({ children, config }) => {
  const searchedParams = useParams();

  const { data, pagination, sorting, onToggle, withActions = false, useExpand = true, usePagination = true } = config;

  const nestedRoute = new RegExp(`/${searchedParams.id}`, 'g');
  const parentRoute = window.location.pathname.replace(nestedRoute, '');

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  useEffect(() => {
    return () => {
      onToggle({ value: false });
    };
  }, []);

  const printActions = useMemo(() => {
    if (sorting?.options?.length) {
      return (
        <div className="flex flex-col-reverse gap-y-5 items-end 3md:items-center 3md:flex-row gap-x-5">
          {useExpand && <ToggleRows onToggleClick={onToggle} />}
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
          {searchedParams?.id && <NextLink href={parentRoute}>Back to all</NextLink>}
          <ToggleRows onToggleClick={onToggle} />
          <FleetsActions />
        </div>
      );
    }

    return useExpand && <ToggleRows onToggleClick={onToggle} />;
  }, [onToggle, sorting, withActions, dropdownStyles, searchedParams?.id, parentRoute, useExpand]);

  return (
    <div className="px-5">
      <section className="flex min-h-[85vh] flex-col gap-y-5">
        <div className="flex justify-between items-center pt-5">
          <div className="flex flex-col">
            <Label className="text-xs-sm">{data.label}</Label>
            <Title level="1">{data.title}</Title>
            {searchedParams?.id && (
              <div className="flex items-center group">
                <DoubleArrowSVG className="fill-blue rotate-90 group-hover:fill-blue-darker transition-all duration-500" />
                <NextLink
                  className="text-blue group-hover:text-blue-darker text-xsm transition-all duration-500"
                  href={parentRoute}
                >
                  Back to all deals
                </NextLink>
              </div>
            )}
          </div>
          {printActions}
        </div>
        <AccountWrapper>{children}</AccountWrapper>
        {(usePagination || searchedParams?.id) && (
          <ComplexPagination
            label="offers"
            perPage={pagination?.perPage}
            currentPage={pagination?.currentPage}
            numberOfPages={pagination?.totalPages}
            onPageChange={pagination?.handlePageChange}
            onSelectedPageChange={pagination?.handleSelectedPageChange}
            onChangeOffers={pagination?.onChangeOffers}
          />
        )}
      </section>
    </div>
  );
};

AccountNestedLayout.propTypes = AccountNestedLayoutPropTypes;

export default AccountNestedLayout;
