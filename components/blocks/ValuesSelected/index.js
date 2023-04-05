import React from 'react';

import PropTypes from 'prop-types';

import { valuesPropTypes } from '@/utils/types';

import { BenefitCard } from '@/collections';
import { BlockShortDescription, BlockTitle } from '@/elements';

const renderValue = ({ id, value }, index) => {
  const { title, subTitle, shortDescription, valueType, coverImage } = value;

  switch (valueType.code) {
    case 'benefit':
      return (
        <BenefitCard
          key={id}
          title={title}
          subTitle={subTitle}
          shortDescription={shortDescription}
          image={coverImage}
          number={index + 1}
          isPrimary={index === 2}
        />
      );
    default:
      return null;
  }
};

const renderValues = (values) => {
  switch (values[0]?.value?.valueType?.code) {
    case 'benefit':
      return (
        <div className="flex flex-col flex-nowrap gap-y-3 lg:flex-row lg:gap-x-5 2lg:gap-x-6 mt-10 lg:mt-14 2lg:mt-16">
          {values.map(renderValue)}
        </div>
      );
    default:
      return null;
  }
};

const ValuesSelected = ({ title, shortDescription, values }) => {
  return (
    <section className="mb-28 sm:mb-44 2lg:mb-64">
      {title && <BlockTitle title={title} />}
      {shortDescription && <BlockShortDescription shortDescription={shortDescription} />}
      {values && renderValues(values)}
    </section>
  );
};

ValuesSelected.defaultProps = {
  title: '',
  shortDescription: '',
  values: [],
};

ValuesSelected.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  values: valuesPropTypes,
};

export default ValuesSelected;
