'use client';

import { useEffect, useState } from 'react';

import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { faqsByTypeAdapter } from '@/adapters/faqs';
import { Title } from '@/elements';
import { getFAQs } from '@/services/faq';
import { Accordion, TabsVertical } from '@/units';

const FAQByType = () => {
  const [faqList, setFaqList] = useState([]);
  const [currentTab, setCurrentTab] = useState('');

  // todo: set up categories for each role once they are ready
  const categoryId = 1;

  useEffect(() => {
    (async () => {
      const data = await getFAQs();
      setFaqList(faqsByTypeAdapter(data, categoryId));
    })();
  }, [categoryId]);

  useEffect(() => {
    setCurrentTab(faqList[0]?.questionType.title);
  }, [faqList]);

  const tabs = faqList
    .map(({ questionType }) => questionType)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    })
    .map(({ title }) => {
      return {
        label: title,
        value: title,
      };
    });

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
      {faqList.length > 0 && (
        <div className="shadow-xmd rounded-base bg-white flex gap-20 px-5">
          <TabsVertical activeTab={currentTab} onClick={handleActiveTab} tabs={tabs} customStyles="py-5" />
          <div className="divide-y divide-gray-darker grow">{faqList.map(printQuestionsByType)}</div>
        </div>
      )}
    </div>
  );
};

FAQByType.propTypes = {
  title: PropTypes.string,
};

export default FAQByType;
