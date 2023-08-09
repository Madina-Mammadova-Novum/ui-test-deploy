'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AuthNavButtonsPropTypes } from '@/lib/types';

import { LinkAsButton, LoginButton } from '@/elements';
import { ROUTES } from '@/lib';
import { getUserDataSelector } from '@/store/selectors';

const AuthNavButtons = ({ data = [] }) => {
  const { isAuthenticated } = useSelector(getUserDataSelector);

  const printUnAuthButtons = ({ path, label, linkOptions }) => {
    if (path === ROUTES.LOGIN)
      return (
        <li key={path}>
          <LoginButton className="max-w-[115px] mx-auto" text={label} variant={linkOptions?.style} />
        </li>
      );
    return (
      <li key={path}>
        <LinkAsButton
          href={path}
          target={linkOptions ? linkOptions.target : null}
          buttonProps={{
            variant: linkOptions ? linkOptions.style : 'tertiary',
            size: 'large',
          }}
          customStyles="max-w-[115px] mx-auto"
        >
          {label}
        </LinkAsButton>
      </li>
    );
  };

  const printAuthButton = useMemo(() => {
    return (
      <LinkAsButton
        href={ROUTES.ACCOUNT_NEGOTIATING}
        buttonProps={{ variant: 'secondary', size: 'large' }}
        customStyles="capitalize"
      >
        Go to deals
      </LinkAsButton>
    );
  }, []);

  return <ul className="flex gap-x-2.5">{!isAuthenticated ? data.map(printUnAuthButtons) : printAuthButton}</ul>;
};

AuthNavButtons.propTypes = AuthNavButtonsPropTypes;

export default AuthNavButtons;
