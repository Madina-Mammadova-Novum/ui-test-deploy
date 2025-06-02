import { AuthNavButtonsPropTypes } from '@/lib/types';

import { LinkAsButton, LoginButton } from '@/elements';
import { ROUTES } from '@/lib';

const AuthNavButtons = ({ authorized, data = [] }) => {
  const printUnAuthButtons = ({ path, label, linkOptions }) => {
    if (path === ROUTES.LOGIN)
      return (
        <li key={path}>
          <LoginButton className="mx-auto max-w-[115px]" text={label} variant={linkOptions?.style} />
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
          prefetch
        >
          {label}
        </LinkAsButton>
      </li>
    );
  };

  return (
    <ul className="hidden gap-x-2 md:flex">
      {!authorized ? (
        data.map(printUnAuthButtons)
      ) : (
        <LinkAsButton
          href={ROUTES.ACCOUNT_NEGOTIATING}
          buttonProps={{ variant: 'secondary', size: 'large' }}
          customStyles="capitalize"
          prefetch
        >
          Go to deals
        </LinkAsButton>
      )}
    </ul>
  );
};

AuthNavButtons.propTypes = AuthNavButtonsPropTypes;

export default AuthNavButtons;
