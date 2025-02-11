'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Dropdown, DynamicLoader, Label, Title } from '@/elements';
import { NAVIGATION_PARAMS, POST_FIXTURE_SORT_COLUMN_OPTIONS } from '@/lib/constants';
import { PostFixtureResultContent } from '@/modules';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { getCargoVesselDataSelector, getPostFixtureDataSelector } from '@/store/selectors';
import { FailedOffersFilter, FilterByForm } from '@/units';
import { convertDataToOptions, options } from '@/utils/helpers';

const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

const FailedOffers = () => {
  const dispatch = useDispatch();

  const [userStore, setUserStore] = useState({
    sortColumnDirectionOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortColumnDirection: '',
    sortColumnOptions: POST_FIXTURE_SORT_COLUMN_OPTIONS,
    sortColumn: '',
  });

  const { offers, loading, toggle, perPage, searchParams } = useSelector(getPostFixtureDataSelector);
  const { cargoTypes, cargoCodes, vesselNames, loading: cargoVesselLoading } = useSelector(getCargoVesselDataSelector);
  const { sortColumnDirectionOptions, sortColumnDirection, sortColumnOptions, sortColumn } = userStore;

  const filterData = {
    cargoTypes: convertDataToOptions(cargoTypes, 'id', 'name'),
    cargoCodes: options(cargoCodes?.data || []),
    tankerNames: options(vesselNames?.data || []),
    loading: cargoVesselLoading,
  };

  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSortSelection = (key, sortOption) => {
    dispatch(
      fetchPostFixtureOffers({
        page: 1,
        perPage,
        searchParams,
        sorting: {
          sortColumnDirection: sortColumnDirection?.value,
          sortColumn: sortColumn?.value,
          [key]: sortOption.value,
        },
      })
    );
  };

  const handleSortColumnSelection = (option) => {
    handleChangeState('sortColumn', option);
    if (sortColumnDirection) handleSortSelection('sortColumn', option);
  };

  const handleSortDirectionSelection = (option) => {
    handleChangeState('sortColumnDirection', option);
    if (sortColumn) handleSortSelection('sortColumnDirection', option);
  };

  const printContent = useMemo(() => {
    if (loading) return <DynamicLoader />;

    if (offers?.length)
      return (
        <div className="flex flex-col gap-y-5">
          <PostFixtureResultContent data={offers} toggle={toggle} />
        </div>
      );

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, toggle]);

  return (
    <>
      <FilterByForm
        isLoading={
          loading || cargoVesselLoading.cargoCodes || cargoVesselLoading.cargoTypes || cargoVesselLoading.vesselNames
        }
      >
        <FailedOffersFilter {...filterData} />
      </FilterByForm>

      <div className="flex items-center justify-end gap-2.5 pt-6">
        <Label className="text-xs-sm font-semibold">Sort cargoes by:</Label>
        <div className="flex">
          <Dropdown
            placeholder="Sort by"
            options={sortColumnOptions}
            defaultValue={sortColumn}
            customStyles={dropdownStyles}
            onChange={handleSortColumnSelection}
          />

          <Dropdown
            placeholder="Sort direction"
            options={sortColumnDirectionOptions}
            defaultValue={sortColumnDirection}
            customStyles={dropdownStyles}
            onChange={handleSortDirectionSelection}
          />
        </div>
      </div>
      {printContent}
    </>
  );
};

FailedOffers.propTypes = UrlPropTypes;

export default FailedOffers;
