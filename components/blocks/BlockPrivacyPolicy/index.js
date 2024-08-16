import React from 'react';

import PropTypes from 'prop-types';

import { ContentElement } from '@/elements';

const BlockPrivacyPolicy = ({ title, content }) => {
  return (
    <section className="mb-28 sm:mb-44 2xl:mb-64">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[846px]">
          {title && <h1 className="mb-8 text-4xl font-bold text-black md:text-6xl">{title}</h1>}
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
