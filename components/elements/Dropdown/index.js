/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import NextLink from '../NextLink';

import { navigationPropTypes } from '@/utils/types';

import { makeId, uniqueArray } from '@/utils/helpers';

const Dropdown = ({ concerns }) => {
  const renderConcerns = useMemo(() => {
    if (!concerns.length) return [];
    const categories = uniqueArray(concerns.map((concern) => concern.related.category));

    return categories.map((category) => {
      return (
        <div key={makeId()} className="min-w-[150px]">
          <p className="text-secondary text-[12px] leading-[130%] font-medium uppercase mb-4">{category.title}</p>
          <ul className="flex flex-col gap-y-[25px]">
            {concerns
              .filter((item) => item.related.category.code === category.code)
              .map(({ path, title }) => {
                return (
                  <li key={makeId()}>
                    <NextLink label={title} href={path} type="default" />
                  </li>
                );
              })}
          </ul>
        </div>
      );
    });
  }, [concerns]);

  if (!concerns.length) return [];

  return (
    <div className=" flex gap-x-[34px] invisible absolute top-8 group-hover/dropdown:!visible rounded-lg p-10  bg-white z-[100]">
      {concerns && renderConcerns}
    </div>
  );
};

Dropdown.defaultProps = {
  currentPath: '',
};

Dropdown.propTypes = {
  concerns: PropTypes.arrayOf(navigationPropTypes).isRequired,
  currentPath: PropTypes.string,
};

export default Dropdown;
