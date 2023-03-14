import classnames from 'classnames';
import PropTypes from 'prop-types';

import ClockSVG from '@/assets/images/clock.svg';
import { Badge, Button, NextImage, StatusIndicator, Toggle } from '@/elements';
import { makeId } from '@/utils/helpers';

const TableCell = ({
  countryFlag,
  text,
  toggle,
  badge,
  actions,
  status,
  timer,
  semibold,
  color,
  handleActionClick,
}) => {
  return (
    <td>
      <div
        className={classnames('flex items-center font-normal text-xsm', color && `text-${color}`, {
          '!font-semibold': semibold,
        })}
      >
        {countryFlag && (
          <NextImage
            width={20}
            height={15}
            customStyles="max-h-[15px] mr-1.5"
            src={countryFlag}
            alt={`${countryFlag} flag`}
          />
        )}
        {status && <StatusIndicator status={status} customStyles="mr-1.5" />}
        {timer && <ClockSVG className="fill-red mr-1" />}
        {actions &&
          actions.map(({ text: btnText, value, size }) => (
            <Button
              buttonProps={{ text: btnText, variant: 'primary', size: size || 'medium' }}
              onClick={() => handleActionClick({ id: value })}
            />
          ))}
        {toggle && <Toggle id={makeId()} />}
        {badge && <Badge>{badge}</Badge>}
        {text}
      </div>
    </td>
  );
};

TableCell.defaultProps = {
  countryFlag: '',
  text: '',
  badge: '',
  toggle: false,
  actions: [],
  status: '',
  timer: false,
  semibold: false,
  color: '',
  handleActionClick: () => {},
};

TableCell.propTypes = {
  countryFlag: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  text: PropTypes.string,
  badge: PropTypes.string,
  toggle: PropTypes.bool,
  actions: PropTypes.shape([]),
  status: PropTypes.string,
  timer: PropTypes.bool,
  semibold: PropTypes.bool,
  color: PropTypes.string,
  handleActionClick: PropTypes.func,
};

export default TableCell;
