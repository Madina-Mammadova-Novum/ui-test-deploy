'use client';

import { useState } from 'react';

import {
  postFixtureDetailsAdapter,
  postFixtureDocumentsTabRowsDataAdapter,
  postFixtureHeaderDataAdapter,
} from '@/adapters/post-fixture';
import { Dropdown, ExpandableCardHeader, Label } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow, PostFixtureExpandedContent } from '@/modules';
import { options } from '@/utils/helpers';

const PostFixtureResultContent = ({ data, toggle, isOpened, tab }) => {
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

  const printExpandableRow = (rowData) => {
    const rowHeader = postFixtureHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        expand={toggle}
        isOpened={isOpened}
      >
        <PostFixtureExpandedContent
          offerId={rowData?.id}
          tab={tab}
          detailsData={postFixtureDetailsAdapter({ data: rowData })}
          documentsData={postFixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

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
