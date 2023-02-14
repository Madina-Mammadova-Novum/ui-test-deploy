import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import CollapseBody from './CollapseBody';
import CollapseHeader from './CollapseHeader';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon } from '@/assets/Icons';
import { setActive, setOpen } from '@/store/entities/system/slice';

const Collapsible = ({ data }) => {
  const dispatch = useDispatch();

  const { open, active } = useSelector(({ system }) => system.sidebar);

  const handleMore = useCallback(() => {
    dispatch(setOpen());
  }, [dispatch]);

  const isActive = Boolean(active === data.id);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'positions':
        return <PositionIcon isActive={isActive} />;
      case 'offers':
        return <OfferIcon isActive={open} />;
      case 'fleets':
        return <AnchorIcon isActive={isActive} />;
      case 'faq':
        return <FaqIcon isActive={isActive} />;
      default:
        return null;
    }
  }, [data?.variant, isActive, open]);

  const printTitle = useMemo(() => {
    return (
      <span
        aria-hidden="true"
        onClick={() => dispatch(setActive(data?.id))}
        className="flex text-sm font-semibold capitalize gap-3.5 px-5 py-3 rounded-xl"
      >
        {printIcon}
        {data?.title}
      </span>
    );
  }, [data?.id, data?.title, dispatch, printIcon]);

  return (
    <>
      <CollapseHeader
        toggle={open}
        active={isActive}
        onClick={handleMore}
        href={data?.path ?? '/'}
        isSubMenu={Boolean(data?.items?.length)}
        className="flex items-center transition-all"
      >
        {data?.title ? printTitle : <p>Title not found</p>}
      </CollapseHeader>
      <CollapseBody list={data?.items} toggle={open} />
    </>
  );
};

Collapsible.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default Collapsible;
