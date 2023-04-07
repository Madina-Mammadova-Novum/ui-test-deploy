import PropTypes from 'prop-types';

const Loader = ({ className }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`${className} border-4 rounded-full border-t-blue animate-spin`} />
    </div>
  );
};

Loader.defaultProps = {
  className: 'w-8 h-8',
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
