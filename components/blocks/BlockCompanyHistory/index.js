import React from 'react';

import PropTypes from 'prop-types';

import { Title } from '@/elements';

const BlockCompanyHistory = ({ title, description }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      <div className="md:flex md:gap-x-20">
        <div className="md:min-w-[792px]">
          {title && (
            <Title component="h1" customStyles="!mb-6">
              {title}
            </Title>
          )}
        </div>
        {description && (
          <div className="flex">
            <div>
              {description.map((item) => {
                return (
                  <p className="text-sm mb-3 text-gray sm:text-base md:text-lg" key={item.id}>
                    {item.title}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

BlockCompanyHistory.defaultProps = {
  title: '',
};

BlockCompanyHistory.propTypes = {
  title: PropTypes.string,
  description: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlockCompanyHistory;
