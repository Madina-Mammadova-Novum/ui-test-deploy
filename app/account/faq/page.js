import { metaData } from '@/adapters/metaData';
import { AccountWrapper, FAQBlock } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'FAQ',
      },
    },
  });
}

const Faq = () => {
  return (
    <AccountWrapper containerClass="grow px-5">
      <FAQBlock/>
    </AccountWrapper>
  );
};

export default Faq;
