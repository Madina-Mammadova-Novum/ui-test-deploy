'use client';

import { useState } from 'react';

import { postFixtureHeaderDataAdapter, postFixtureRowsDataAdapter } from '@/adapters/post-fixture';
import { Dropdown, ExpandableCardHeader, Label } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow, PostFixtureExpandedContent, PostFixtureExpandedFooter } from '@/modules';
import { options } from '@/utils/helpers';

const PostFixtureResultContent = ({ data, toggle }) => {
  const [userStore, setUserStore] = useState({
    sortByUpDownOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortByUpDownValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
    sortByCargoeTypeOptions: options(['Fixture date', 'Quantity', 'Laycan start']),
    sortByCargoeTypeValue: '',
  });

  const { sortByUpDownOptions, sortByUpDownValue, sortByCargoeTypeOptions, sortByCargoeTypeValue } = userStore;

  /* Change handler by key-value for userStore */

  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChangeCargoeTypeSort = (option) => handleChangeState('sortByCargoeTypeValue', option);
  const handleChangeUpDownSort = (option) => handleChangeState('sortByUpDownValue', option);

  const printExpandableRow = (headerData) => (
    <ExpandableRow
      header={<ExpandableCardHeader headerData={postFixtureHeaderDataAdapter({ data: headerData })} />}
      footer={<PostFixtureExpandedFooter />}
      expand={toggle}
    >
      <PostFixtureExpandedContent rowsData={postFixtureRowsDataAdapter({ data: headerData?.documentsInfo })} />
    </ExpandableRow>
  );

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-end pt-6 items-center gap-2.5">
        <Label className="text-xs-sm	font-semibold">Sort cargoes by:</Label>
        <div className="flex">
          <Dropdown
            placeholder="Fixture date"
            options={sortByCargoeTypeOptions}
            defaultValue={sortByCargoeTypeValue}
            customStyles={dropdownStyles}
            onChange={handleChangeCargoeTypeSort}
          />

          <Dropdown
            options={sortByUpDownOptions}
            defaultValue={sortByUpDownValue}
            customStyles={dropdownStyles}
            onChange={handleChangeUpDownSort}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">{data?.map(printExpandableRow)}</div>
    </div>
  );
};

PostFixtureResultContent.propTypes = PostFixtureResultContent;

export default PostFixtureResultContent;
