import React from 'react';

import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { Title } from '@/elements';

const SimpleContentBlock = ({ title, content }) => {
  return (
    <section>
      <div className="max-w-[960px] container mx-auto">
        {title && (
          <Title level="1" className="text-center text-black my-2.5">
            {title}
          </Title>
        )}
        <div className="content-wrapper space-y-2.5 text-xsm text-black">{parse(content)}</div>
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
