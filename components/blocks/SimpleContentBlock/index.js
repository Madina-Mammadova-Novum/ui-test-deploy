import React from 'react';

import classnames from "classnames";
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { Title } from '@/elements';

const SimpleContentBlock = ({ title, content }) => {
  const isLegalPage = false

  return (
    <section>
      <div className={classnames(isLegalPage ? 'px-[54px] max-w-[1258px]' : ' max-w-[960px]', 'container mx-auto' )}
      >
        {title && (
          <Title level="1" className="text-center text-black my-2.5">
            {title}
          </Title>
        )}
        { content && isLegalPage ?
          <div className="rounded-base p-5 bg-white relative -mt-[188px] mb-[100px]">
            <div className="content-wrapper space-y-2.5 text-xsm text-black">{parse(content)}</div>
            <div className="rounded-base h-[calc(100%_-_188px)] w-full absolute shadow-xmd bottom-0 left-0 -z-10" />
          </div>
          :
          <div className="content-wrapper space-y-2.5 text-xsm text-black">{parse(content)}</div>
        }

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
