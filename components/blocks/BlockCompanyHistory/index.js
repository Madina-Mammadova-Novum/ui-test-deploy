import React from 'react';

import PropTypes from 'prop-types';

import { Title } from '@/elements';

const BlockCompanyHistory = ({ title, shortDescription, description, quote }) => {
  return (
    <section className="">
      <div className="container mx-auto max-w-[960px]">
          {title && (
            <Title component="h1" className="text-center">
              {title}
            </Title>
          )}
        {shortDescription && (
          <p className="text-black text-xsm my-2.5">{shortDescription}</p>
        )}
        {quote && (
          <p className="my-4 py-2 pl-4 text-black text-xsm font-semibold border-l-2 border-blue">{quote}</p>
        )}
        {description && (
            <div>
              {description.map((item) => {
                return (
                  <p className="text-black text-xsm my-2.5" key={item.id}>
                    {item.description}
                  </p>
                );
              })}
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
  quote: PropTypes.string,
  shortDescription: PropTypes.string,
  description: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlockCompanyHistory;
