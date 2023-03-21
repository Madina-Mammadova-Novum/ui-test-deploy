// 'use client';
//
// import React, { useCallback, useMemo, useState } from 'react';
//
// import { useRouter } from 'next/router';
// import { useTranslation } from 'next-i18next';
// import PropTypes from 'prop-types';
//
// import { categoryPropType } from '@/utils/types';
//
// // import { FAQItem } from '@/collections';
// import { NextLink } from '@/elements';
//
// const BlockFAQs = ({ categories, faqQuestions }) => {
//   // const [openedQuestionIndex, setOpenedQuestionIndex] = useState(null);
//   const router = useRouter();
//   const { t } = useTranslation();
//   const { faqTabId } = router.query;
//
//   // const handleOpenQuestion = useCallback(
//   //   (index) => {
//   //     if (openedQuestionIndex === index) {
//   //       setOpenedQuestionIndex(null);
//   //       return;
//   //     }
//   //     setOpenedQuestionIndex(index);
//   //   },
//   //   [openedQuestionIndex]
//   // );
//
//   const selectedFaqCategoryTitle = useMemo(() => {
//     return categories.find((category) => category.code === faqTabId)?.title;
//   }, [categories, faqTabId]);
//
//   return (
//     <section className="relative mb-28 sm:mb-44 2lg:mb-64">
//       <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6">
//         <div className="col-span-1">
//           <h1 className="text-4xl text-black font-bold mb-8 sm:text-6xl md:hidden">{t('FAQ')}</h1>
//           <div className="flex flex-col gap-y-8 bg-secondary-light px-4 py-8 rounded-[10px] md:max-w-[412px] md:p-10">
//             <h1 className="hidden  text-black font-bold mb-2 md:block  md:text-7xl">{t('FAQ')}</h1>
//             {categories &&
//               categories.map(({ title, code }) => {
//                 return (
//                   <NextLink
//                     label={title}
//                     href={`/faq?faqTabId=${code}`}
//                     isActive={faqTabId === code}
//                     type="default"
//                     customStyles="max-w-fit"
//                   />
//                 );
//               })}
//           </div>
//         </div>
//         <div className="col-span-1 md:col-span-2 md:max-w-[848px]">
//           <h2 className="tet-black text-2xl font-bold mb-6 sm:text-4xl md:text-5xl md:mb-10">
//             {selectedFaqCategoryTitle}
//           </h2>
//           {faqQuestions &&
//             faqQuestions
//               .filter((item) => item.category.code === faqTabId)
//               .map(({ question, answer }, index) => {
//                 return (
//                   <>
//                     <h2>
//                       {index + 1} . {question}
//                     </h2>
//                     <div>{answer}</div>
//                   </>
//                   // <FAQItem
//                   //   question={question}
//                   //   answer={answer}
//                   //   index={index + 1}
//                   //   isOpened={openedQuestionIndex === index + 1}
//                   //   handleOpenQuestion={handleOpenQuestion}
//                   // />
//                 );
//               })}
//         </div>
//       </div>
//     </section>
//   );
// };
//
// BlockFAQs.propTypes = {
//   faqQuestions: PropTypes.arrayOf({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     answer: PropTypes.string.isRequired,
//     question: PropTypes.string.isRequired,
//     category: PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       code: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   categories: PropTypes.arrayOf(categoryPropType).isRequired,
// };
//
// export default BlockFAQs;
