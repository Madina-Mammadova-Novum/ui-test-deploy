'use client';

import React, { useEffect, useState } from 'react';

import { NextLink } from '@/elements';
import { getNavigation } from '@/services/navigation';

const LegalNavigation = () => {
  const [legalNavigation, setLegalNavigation] = useState([]);

  const printLink = ({ path, title }) => (
    <NextLink key={path} href={path} target="_blank" className="underline">
      {title}
    </NextLink>
  );
  const fetchData = async () => {
    const response = await getNavigation('legal-navigation', 'en');
    const { data } = response;

    setLegalNavigation(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!legalNavigation.length) return null;
  return <div className="flex gap-x-5 text-black"> {legalNavigation.map(printLink)}</div>;
};

export default LegalNavigation;
