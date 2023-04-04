import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { makeId } from '@/utils/helpers';

const FAQBlock = ({ title, subTitle, shortDescription, items }) => {
  return (
    <div>
      {title && <div>{title}</div>}
      {subTitle && <div>{subTitle}</div>}
      {shortDescription && <div>{shortDescription}</div>}
      {items && (
        <div>
          {items.map(({ id, answer, question }) => (
            <div key={makeId()}>
              <div>{id}</div>
              <div>{answer}</div>
              <div>{question}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FAQBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      answer: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shortDescription: PropTypes.string,
      coverImage: mediaPropTypes,
    })
  ),
};

export default FAQBlock;
