'use client';

import { useEffect, useState } from 'react';

import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { faqsByTypeAdapter } from '@/adapters/faqs';
import { Title } from '@/elements';
import { ROLES } from '@/lib/constants';
import { getFAQs } from '@/services/faq';
import { Accordion, TabsVertical } from '@/units';

const FAQByType = () => {
  const [faqList, setFaqList] = useState([]);

  const categoryId = ROLES.CHARTERER ? 1 : 2;

  useEffect(() => {
    (async () => {
      const data = await getFAQs();
      setFaqList(faqsByTypeAdapter(data, categoryId));
    })();
  }, []);

  const questionTypes = faqList
    .map(({ questionType }) => questionType)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });

  const tabs = questionTypes.map(({ title }) => {
    return {
      label: title,
      value: title,
    };
  });

  // todo: set initial state
  const [currentTab, setCurrentTab] = useState( '');
  const handleActiveTab = ({ target }) => {
    const { value } = target;
    setCurrentTab(value);
  };

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const printQuestionsByType = ({ question, answer, id, questionType }) => {
    return (
      currentTab === questionType.title && (
        <Accordion
          key={`id-${id}`}
          open={open === id}
          onClick={() => handleOpen(id)}
          isFullWidth
          items={[
            {
              headerContent: question,
              bodyContent: parse(answer),
            },
          ]}
        />
      )
    );
  };

  return (
    <div>
      <Title className="py-5" level={1}>
        FAQ
      </Title>
      <div className="shadow-xmd rounded-base bg-white flex gap-20 px-5">
        <TabsVertical activeTab={currentTab} onClick={handleActiveTab} tabs={tabs} customStyles="py-5" />
        {faqList && <div className="divide-y divide-gray-darker grow">{faqList.map(printQuestionsByType)}</div>}
      </div>
    </div>
  );
};

FAQByType.propTypes = {
  title: PropTypes.string,
};

export default FAQByType;
