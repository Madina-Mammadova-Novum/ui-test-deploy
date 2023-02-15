import classnames from 'classnames';
import PropTypes from 'prop-types';

const Toggle = ({ customStyles, id }) => {
  return (
    <label htmlFor={id} className={classnames('relative inline-block w-[30px] h-[18px]', customStyles)}>
      <input id={id} type="checkbox" className="hidden peer" />
      <span
        className="
                    absolute cursor-pointer bg-gray-darker rounded-[25px] top-0 left-0 bottom-0 right-0 transition 
                    before:absolute before:content-[''] before:left-0.5 before:top-[50%] before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-[50%] before:bg-white before:transition 
                    peer-checked:bg-blue peer-checked:before:translate-x-[13px]
                "
      />
    </label>
  );
};

Toggle.defaultProps = {
  customStyles: '',
};

Toggle.propTypes = {
  customStyles: PropTypes.string,
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

export default Toggle;
