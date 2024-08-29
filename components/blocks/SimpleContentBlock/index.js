import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { Title } from '@/elements';

const SimpleContentBlock = ({ title, content }) => {
  return (
    <section>
      <div className="container mx-auto max-w-[960px]">
        {title && (
          <Title level="1" className="my-2.5 text-center text-black">
            {title}
          </Title>
        )}
        {content && <div className="content-wrapper space-y-2.5 text-xsm text-black">{parse(content)}</div>}
      </div>
    </section>
  );
};

SimpleContentBlock.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default SimpleContentBlock;
