import { useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';

import { Title } from '@/elements';

const Notes = ({ title, subtitle, data }) => {
  const printListItem = useCallback(({ id, label, list }) => {
    return (
      <div key={id} className="max-w-max">
        {label && <p className="text-gray uppercase pb-1.5">{label}</p>}
        <ul className="px-5">
          {list &&
            list?.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className="list-disc">
                {item}
              </li>
            ))}
        </ul>
      </div>
    );
  }, []);

  const printRuleList = useMemo(() => {
    return data?.map(printListItem);
  }, [data, printListItem]);

  return (
    <article className="flex flex-col py-3 px-5 gap-1.5 rounded-lg bg-gray-light border border-solid border-gray-darker">
      <Title component="h6" className="text-xsm font-semibold">
        {title}
      </Title>
      <p className="text-xs-sm text-black">{subtitle}</p>
      <div className="grid grid-cols-2 text-xs-sm text-black font-bold pt-1.5">{printRuleList}</div>
    </article>
  );
};

Notes.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Notes;
