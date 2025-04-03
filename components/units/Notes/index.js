import { useCallback, useMemo } from 'react';

import { NotesPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const Notes = ({ title, subtitle, data, children }) => {
  const printListItem = useCallback(({ id, label, list }) => {
    return (
      <div key={id} className="max-w-max">
        {label && <p className="pb-1.5 uppercase text-gray">{label}</p>}
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
    <article className="flex flex-col gap-1.5 rounded-lg border border-solid border-gray-darker bg-gray-light px-5 py-3">
      {title && (
        <Title level="6" className="text-xsm font-semibold">
          {title}
        </Title>
      )}
      {subtitle && <p className="text-xs-sm text-black">{subtitle}</p>}
      {data && <div className="grid grid-cols-2 pt-1.5 text-xs-sm font-bold text-black">{printRuleList}</div>}
      {children}
    </article>
  );
};

Notes.propTypes = NotesPropTypes;
export default Notes;
