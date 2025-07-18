import { FixtureExpandedFooterPropTypes } from '@/lib/types';

import { Divider, QrCode } from '@/elements';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const baseUrl =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL
    : process?.env?.NEXT_PUBLIC_API_URL || 'https://ship.link';
const APP_QR_URL = `${baseUrl}/qr-redirect?variant=download`;
const APP_LOGO_PATH = '/images/dark-logo.svg';

const FixtureExpandedFooter = ({ underRecap = true, identity }) => {
  return (
    <ExpandableRowFooter>
      <Divider />
      <div className="flex justify-end gap-x-5 pt-2.5">
        <div className="flex items-center justify-end gap-x-2.5 gap-y-2.5">
          <div className="flex w-full gap-x-2.5">
            {identity?.isOwner && (
              <ModalWindow
                buttonProps={{
                  variant: 'primary',
                  size: 'large',
                  text: 'Sign the Documents',
                  className: 'w-max',
                  disabled: underRecap,
                }}
                containerClass="w-[356px] max-w-full"
              >
                <div className="flex flex-col items-center p-4 text-center">
                  <div className="mb-4 text-xsm font-semibold text-gray-900">
                    Document signing is handled in our mobile app. If you&apos;ve already downloaded it, please open the
                    app now. Otherwise, scan the QR code below to download the app.
                  </div>
                  <div className="flex justify-center">
                    <QrCode
                      value={APP_QR_URL}
                      logo={APP_LOGO_PATH}
                      size={180}
                      logoWidth={150}
                      logoHeight={100}
                      logoOpacity={0.5}
                    />
                  </div>
                  <div className="mt-4 text-xs text-gray-500">Scan to download the ShipLink app</div>
                </div>
              </ModalWindow>
            )}
          </div>
        </div>
      </div>
    </ExpandableRowFooter>
  );
};

FixtureExpandedFooter.propTypes = FixtureExpandedFooterPropTypes;

export default FixtureExpandedFooter;
