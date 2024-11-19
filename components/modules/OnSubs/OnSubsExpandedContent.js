'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';
import ExtendOnSubsCountdown from './ExtendOnSubsCountdown';

import { OnSubsExpandedContentPropTypes } from '@/lib/types';

import PrintSVG from '@/assets/images/print.svg';
import { Button } from '@/elements';
import { getPdfToPrint } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
import { ModalWindow, Tabs } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'document',
  },
];

const OnSubsExpandedContent = ({ detailsData = {}, documentsData = [], offerId, tab = 'details' }) => {
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0].value);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(detailsData?.allowExtension);
  const [isLoading, setIsLoading] = useState(false);

  const { role } = useSelector(getUserDataSelector);
  const { isCharterer } = getRoleIdentity({ role });

  const handlePrint = async () => {
    setIsLoading(true);
    let pdfUrl;
    let iframe;

    try {
      const response = await getPdfToPrint(offerId);

      if (!response?.data) {
        errorToast('Print Error', 'No PDF data found in response');
      }

      // Create blob URL
      const blob = new Blob([response.data], { type: 'application/pdf' });
      pdfUrl = URL.createObjectURL(blob);

      // Create temporary iframe
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = pdfUrl;

      // Set up print timeout
      const printTimeout = setTimeout(() => {
        errorToast('Print Error', 'Print dialog failed to open - timeout');
      }, 5000);

      // Wait for iframe to load then print
      await new Promise((resolve, reject) => {
        iframe.onload = () => {
          try {
            clearTimeout(printTimeout);
            iframe.contentWindow.print();
            resolve();
          } catch (error) {
            errorToast('Print Error', 'Failed to open print dialog');
            reject(new Error('Failed to open print dialog'));
          } finally {
            iframe.onload = null;
          }
        };
      });
    } catch (error) {
      errorToast('Print Error', error.message);
    } finally {
      // Cleanup
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setIsLoading(false);
    }
  };

  const printContent = useMemo(() => {
    if (currentTab === tabs[1].value) {
      return <DocumentsContent rowsData={documentsData} offerId={offerId} />;
    }

    return <DetailsContent detailsData={detailsData} />;
  }, [currentTab, detailsData, documentsData, offerId]);

  return (
    <>
      <div className={`py-16 2md:py-10 3md:py-8 ${isCharterer && 'xlMax:h-20'}`}>
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        <div className="absolute right-1/2 top-14 flex translate-x-1/2 flex-col items-end gap-2 2md:right-1 2md:top-3 2md:-translate-x-5 3md:flex-row 3md:items-center">
          {isCharterer && (
            <ModalWindow
              buttonProps={{
                text: 'Request response time extension',
                variant: 'primary',
                size: 'small',
                disabled: !allowCountdownExtension,
                className:
                  'border border-blue hover:border-blue-darker whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold',
              }}
            >
              <ExtendOnSubsCountdown offerId={offerId} onExtensionSuccess={() => setAllowCountdownExtension(false)} />
            </ModalWindow>
          )}
          <Button
            buttonProps={{
              text: isLoading ? 'Loading...' : 'Print',
              variant: 'tertiary',
              size: 'large',
              icon: { before: <PrintSVG /> },
            }}
            customStyles="!text-black"
            onClick={handlePrint}
            disabled={isLoading}
          />
        </div>
      </div>
      {printContent}
    </>
  );
};

OnSubsExpandedContent.propTypes = OnSubsExpandedContentPropTypes;

export default OnSubsExpandedContent;
