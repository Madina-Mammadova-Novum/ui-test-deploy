import { UrlPropTypes } from '@/lib/types';

import { searchParamsAdapter } from '@/adapters';
import { metaData } from '@/adapters/metaData';
import { AccountPositions, AccountWrapper } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Account Positions',
      },
    },
  });
}

const AccountPostions = ({ searchParams }) => {
  const urlParams = searchParamsAdapter({ data: searchParams });

  return (
    <AccountWrapper containerClass="px-5">
      <AccountPositions searchParams={urlParams} />
    </AccountWrapper>
  );
};

AccountPostions.propTypes = UrlPropTypes;

export default AccountPostions;
