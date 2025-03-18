import React from 'react';

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return <p className="text-gray">Copyright © 2018-{currentYear} Ship.link. All rights reserved</p>;
};

export default Copyright;
