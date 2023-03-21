import React from 'react';

import PropTypes from 'prop-types';

import { ContentElement } from '@/elements';

const BlockPrivacyPolicy = ({ title, content }) => {
  return (
    <section className="mb-28 sm:mb-44 2lg:mb-64">
      <div className="flex flex-col items-center">
        <div className="max-w-[846px] w-full">
          {title && <h1 className="text-4xl text-black font-bold mb-8 md:text-6xl">{title}</h1>}
          {content && (
            <div>
              <ContentElement content={content} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

BlockPrivacyPolicy.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default BlockPrivacyPolicy;
