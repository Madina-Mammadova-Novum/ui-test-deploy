'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import PostFixtureExpandedContent from './PostFixtureExpandedContent';
import PostFixtureExpandedFooter from './PostFixtureExpandedFooter';

import { PostFixturePropTypes } from '@/lib/types';

import { postFixtureHeaderDataAdapter, postFixtureRowsDataAdapter } from '@/adapters/post-fixture';
import { Button, DatePicker, Dropdown, ExpandableCardHeader, Input, Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserFixtures } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { useFetch, useFilters, useHookFormParams } from '@/utils/hooks';


const PostFixture = ({ title }) => {
  const [toggle, setToggle] = useState(false);
  const [data, isLoading] = useFetch(getUserFixtures);



  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const methods = useHookFormParams({ schema: {} });




  const {
    numberOfPages,
    items,
    currentPage,
    handlePageChange,
    handleSelectedPageChange,
    selectedPage,
    onChangeOffers,
    perPage,
  } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, data);

  const printExpandableRow = (headerData) => (
    <ExpandableRow
      header={<ExpandableCardHeader headerData={postFixtureHeaderDataAdapter({ data: headerData })} />}
      footer={<PostFixtureExpandedFooter />}
      expand={toggle}
    >
      <PostFixtureExpandedContent rowsData={postFixtureRowsDataAdapter({ data: headerData.documentsInfo })} />
    </ExpandableRow>
  );
  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #5</Label>
          <div className='flex justify-between'>
            <Title level={1}>{title}</Title>
            <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
          </div>
          <Title level={3} className='uppercase text-xsm py-5'>Filter by</Title>
          <div className="bg-white rounded-base shadow-xmd p-5">
            <div className='flex flex-wrap justify-between'>
              <FormProvider {...methods}>
                <Input
                  placeholder='TY7621'
                  label="Cargo ID"
                  customStyles='basis-2/12 3md:min-w-[296px] sm:min-w-[296px]'
                />
                <Input
                  label="tanker name"
                  placeholder="Harvey Deep Sea"
                  customStyles='basis-3/12 3md:min-w-[296px] sm:min-w-[296px]'
                />
                <Dropdown
                  placeholder="Select cargo type"
                  label="cargo type"
                  customStyles={{
                    className: 'basis-3/12 top-[-6px] 3md:min-w-[296px] sm:min-w-[296px]',
                  }}
                />
                <div className='basis-2/12 '>
                  <DatePicker
                    label="fixture date"
                    name="fixtureDate"
                  />

                </div>
                <div className='flex min-w-40 mt-3 lg:ml-auto xl:ml-0 3md:ml-auto sm:ml-auto'>
                  <Button
                    customStyles='text-gray min-w-max'
                    buttonProps={{
                      text: 'Show results',
                      variant: 'secondary',
                      size: 'large',
                    }}
                  />
                  <Button
                    customStyles='text-gray min-w-max'
                    buttonProps={{
                      text: 'Reset all',
                      variant: 'primary',
                      size: 'small',
                    }}
                  />
                </div>
              </FormProvider>
            </div>
          </div>
        </div>
        <div className='flex justify-end pt-6 items-center gap-2.5'>
          <Label className='text-xs-sm	font-semibold'>Sort cargoes by:</Label>
          <div className='w-40'>
            <Dropdown
              placeholder='Fixture date'
            />
          </div>
          <div className='w-40'>
            <Dropdown />
          </div>

        </div>
      </div>

      <div className="flex flex-col gap-y-2.5">{items && items.map(printExpandableRow)}</div>

      <ComplexPagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    </section>
  );
};
PostFixture.propTypes = PostFixturePropTypes;


export default PostFixture;
