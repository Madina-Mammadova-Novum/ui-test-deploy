import PropTypes from 'prop-types';

import { NextImage, NextLink, Title } from '@/elements';

const AuthHeader = ({
  logoSrc = '/images/dark-logo.png',
  logoAlt = 'Logo',
  logoHeight = 728,
  logoWidth = 606,
  titleText,
  accountText,
  linkText,
  linkHref,
  extraSection,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-y-5 ${className}`}>
      <NextImage src={logoSrc} alt={logoAlt} customStyles="h-20 w-auto" height={logoHeight} width={logoWidth} />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Title level="1" className="text-black">
          {titleText}
        </Title>
        {accountText && (
          <p className="max-w-[301px] text-xsm text-black">
            {accountText}
            {linkText && linkHref && (
              <>
                {' '}
                <NextLink href={linkHref} className="text-blue underline">
                  {linkText}
                </NextLink>
              </>
            )}
          </p>
        )}
        {extraSection && extraSection}
      </div>
    </div>
  );
};

AuthHeader.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  logoAlt: PropTypes.string,
  logoHeight: PropTypes.number,
  logoWidth: PropTypes.number,
  titleText: PropTypes.string.isRequired,
  accountText: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  extraSection: PropTypes.node,
  className: PropTypes.string,
};

export default AuthHeader;
