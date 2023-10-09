import { TitlePropTypes } from '@/lib/types';

const Title = ({ level = '1', children, className = '', ...rest }) => {
  const Tag = `h${level}`;

  return (
    <Tag className={`${className}`} {...rest}>
      {children}
    </Tag>
  );
};

Title.propTypes = TitlePropTypes;

export default Title;
