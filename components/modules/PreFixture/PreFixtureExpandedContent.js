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
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0]?.value);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(detailsData?.allowExtension);

  const { role } = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

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

  const printContent = useMemo(() => {
    if (currentTab === 'documents') {
      return <DocumentsContent rowsData={documentsData} offerId={offerId} />;
    }

    return <DetailsContent data={detailsData} />;
  }, [currentTab, detailsData, documentsData, offerId]);

  const btnStyles =
    'border border-blue hover:border-blue-darker whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold absolute right-1 -translate-x-5 xlMax:w-fit xlMax:top-14 xlMax:left-[50%] xlMax:transform xlMax:-translate-x-1/2';

  return (
    <div className="px-5">
      <div className="py-8 xlMax:h-20">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        <Button
          buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'small' }}
          customStyles={btnStyles}
          disabled={!allowCountdownExtension}
          onClick={handleExtendCountdown}
        />
      </div>
      {printContent}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
