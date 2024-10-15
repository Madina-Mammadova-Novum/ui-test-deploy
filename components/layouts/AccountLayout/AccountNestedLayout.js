'use client';

import { useEffect, useMemo } from 'react';

import { useParams } from 'next/navigation';

import { AccountNestedLayoutPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/angleDouble.svg';
import { Label, NextLink, Title } from '@/elements';
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
        <div className="flex flex-col-reverse items-end gap-x-5 gap-y-5 3md:flex-row 3md:items-center">
          {useExpand && <ToggleRows onToggleClick={onToggle} />}
        </div>
      );
    }

    if (withActions) {
      return (
        <div className="flex flex-col-reverse items-end gap-x-5 gap-y-5 3md:flex-row 3md:items-center">
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
        <div className="flex items-center justify-between pt-5">
          <div className="flex flex-col">
            <Label className="text-xs-sm">{data.label}</Label>
            <Title level="1">{data.title}</Title>
            {searchedParams?.id && (
              <div className="group flex items-center">
                <DoubleArrowSVG className="rotate-90 fill-blue transition-all duration-500 group-hover:fill-blue-darker" />
                <NextLink
                  className="text-xsm text-blue transition-all duration-500 group-hover:text-blue-darker"
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
