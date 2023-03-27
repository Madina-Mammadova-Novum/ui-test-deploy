import React from 'react';

import PropTypes from 'prop-types';

import { Title } from '@/elements';

const SimpleContentBlock = ({ title, content }) => {
  return (
    <section className="">
      <div className="container mx-auto max-w-[960px]">
        {title && (
          <Title component="h1" className="text-center text-black">
            {title}
          </Title>
        )}
        {content && <div>{content}</div>}
      </div>
    </section>
  );
};

SimpleContentBlock.defaultProps = {
  title: '',
  content: '',
};

SimpleContentBlock.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default SimpleContentBlock;
