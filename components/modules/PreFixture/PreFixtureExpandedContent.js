'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { PreFixtureExpandedContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { extendCountdown } from '@/services/offer';
import { updateCountdown } from '@/store/entities/pre-fixture/slice';
import { getUserDataSelector } from '@/store/selectors';
import { Tabs } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'documents',
  },
];

const PreFixtureExpandedContent = ({ detailsData, documentsData, offerId, tab = 'details' }) => {
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0]?.value);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(detailsData?.allowExtension);

  const { role } = useSelector(getUserDataSelector);

  const handleExtendCountdown = async () => {
    const { error, message: successMessage } = await extendCountdown({ offerId, role });
    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      successToast(successMessage);
      setAllowCountdownExtension(false);
      dispatch(updateCountdown({ offerId }));
    }
  };

  const handleChange = ({ target }) => setCurrentTab(target.value);

  const printContent = useMemo(() => {
    if (currentTab === 'documents') {
      return <DocumentsContent rowsData={documentsData} offerId={offerId} />;
    }

    return <DetailsContent data={detailsData} />;
  }, [currentTab, detailsData, documentsData, offerId]);

  return (
    <div className="px-5">
      <div className="py-8 xlMax:h-20">
        <Tabs
          tabs={tabs}
          activeTab={currentTab}
          onClick={handleChange}
          customStyles="custom-container my-3 -mr-1/2 mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        <Button
          onClick={handleExtendCountdown}
          customStyles="tab-btn"
          disabled={!allowCountdownExtension}
          buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'small' }}
        />
      </div>
      {printContent}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
