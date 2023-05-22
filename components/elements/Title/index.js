import { TitlePropTypes } from '@/lib/types';

const titleStyles = {
  "date-styles": 'text-[14px] text-gray ',
  "offer-styles": 'uppercase font-semibold',
};

const Title = ({ level, children, customStyle, className = '', ...rest }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`${className} ${customStyle && titleStyles[customStyle]}`} {...rest}>
      {children}
    </Tag>
  );
};

Title.propTypes = TitlePropTypes;

export default Title;
