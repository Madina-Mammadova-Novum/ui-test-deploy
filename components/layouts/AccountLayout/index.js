import PropTypes from 'prop-types';

import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';

export default function AccountLayout({ children, socials, legal, routes }) {
  return (
    <AccountContainer>
      <Sidebar data={routes} />
      <AccountHeader />
      <main className="grow">{children}</main>
      <AccountFooter socials={socials} legal={legal} />
    </AccountContainer>
  );
}

AccountLayout.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  legal: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  socials: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
