import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import AccordionHeader from './AccordionHeader';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon } from '@/assets/Icons';
import { setActive, setOpen, setResize } from '@/store/entities/system/slice';

const AccordionSM = ({ data }) => {
  const dispatch = useDispatch();

  const { active } = useSelector(({ system }) => system.sidebar);

  const handleMore = useCallback(() => {
    dispatch(setOpen(true));
    dispatch(setResize());
  }, [dispatch]);

  const isActive = Boolean(active === data.id);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'positions':
        return <PositionIcon isActive={isActive} width="20px" height="20px" />;
      case 'offers':
        return <OfferIcon isActive={isActive} width="20px" height="20px" />;
      case 'fleets':
        return <AnchorIcon isActive={isActive} width="20px" height="20px" />;
      case 'faq':
        return <FaqIcon isActive={isActive} width="20px" height="20px" />;
      default:
        return null;
    }
  }, [data?.variant, isActive]);

  const printCta = useMemo(() => {
    return (
      <button
        type="button"
        onClick={() => dispatch(setActive(data?.id))}
        className={`${
          isActive ? 'bg-blue' : 'hover:bg-blue-dark'
        } flex flex-col text-sm font-semibold capitalize py-2 rounded-md px-2`}
      >
        {printIcon}
      </button>
    );
  }, [data?.id, dispatch, isActive, printIcon]);

  return (
    <AccordionHeader
      onClick={handleMore}
      isSubMenu={Boolean(data?.items?.length)}
      href={data?.path ?? '/'}
      className="flex items-center transition-all"
    >
      {data?.title ? (
        <div className="flex flex-col justify-center items-center">
          {printCta}
          <span className="text-xxs font-bold text-center">{data?.title}</span>
        </div>
      ) : (
        <p>Title not found</p>
      )}
    </AccordionHeader>
  );
};

AccordionSM.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default AccordionSM;
