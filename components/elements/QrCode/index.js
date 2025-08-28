'use client';

import React from 'react';
import { QRCode } from 'react-qrcode-logo';

import PropTypes from 'prop-types';

const QrCode = ({ value, logo, size = 180, ...props }) => {
  // If logo is a public path, convert to absolute URL for QRCode
  let logoImage = logo;
  if (logo && logo.startsWith('/')) {
    if (typeof window !== 'undefined') {
      logoImage = window.location.origin + logo;
    } else {
      logoImage = logo;
    }
  }
  return <QRCode value={value} logoImage={logoImage} size={size} qrStyle="dots" eyeRadius={6} {...props} />;
};

QrCode.propTypes = {
  value: PropTypes.string.isRequired,
  logo: PropTypes.string,
  size: PropTypes.number,
};

export default QrCode;
