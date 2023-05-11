'use client';

import { useEffect, useState } from 'react';

import parse from "html-react-parser";
import PropTypes from 'prop-types';

import { faqsAccountAdapter } from "@/adapters/faqs";
import { Title } from "@/elements";
import { getFAQs } from "@/services/faq";
import { Accordion, TabsVertical } from '@/units';

const FAQBlock = () => {
  const [FAQs, setFAQs] = useState([]);
  const fetchData = async () => {
    const data = await getFAQs();
    setFAQs(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const faqs = faqsAccountAdapter(FAQs, 1)

  const questionTypes = faqs
    .map(({ questionType }) => questionType)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });

  const tabs = questionTypes.map(({ title, id }) => {
    return {
      label: title,
      value: id,
    };
  });

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleChangeTab = ({ target }) => {
    setCurrentTab(+target.value)
  }

  const [currentTab, setCurrentTab] = useState(1);

  const printQuestionsByType = ({ question, answer, id, questionType }) => {
    return (
      currentTab === questionType.id && (
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
      <Title className="py-5" level={1}>FAQ</Title>
      <div className="shadow-xmd rounded-base bg-white flex gap-20 px-5">
         <TabsVertical activeTab={currentTab} onClick={handleChangeTab} tabs={tabs} />
        {faqs &&
        <div className="divide-y divide-gray-darker grow">
          {faqs.map(printQuestionsByType)}
        </div>
        }
      </div>
    </div>
  );
};

FAQBlock.propTypes = {
  title: PropTypes.string,
};

export default FAQBlock;
