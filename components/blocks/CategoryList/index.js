'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { TabsAsLinks } from '@/units';

const CategoryList = ({ categories }) => {
  const pathname = usePathname();

  const tabs = categories.map((category) => {
    return {
      label: category.attributes.title,
      value: category.attributes.slug,
    };
  });

  return (
    <section className="relative z-10">
      <div className="container mx-auto px-[54px] max-w-[1258px] -mt-[65px]">
        <TabsAsLinks tabs={tabs} activeTab={pathname.slice(1)} />
      </div>
    </section>
  );
};

CategoryList.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shortDescription: PropTypes.string,
      coverImage: mediaPropTypes,
    })
  ),
};

export default CategoryList;
