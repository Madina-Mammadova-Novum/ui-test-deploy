import { COTTabContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';

const COTTabContent = ({ data = {} }) => {
  return (
    <div className="text-xsm">
      <Title level={3}>Commercial Offer Terms</Title>
      <div className="mt-2.5">
        {data.cargo?.map(({ key, label }) => (
          <TextRow title={key}>{label}</TextRow>
        ))}
      </div>

      <hr className="my-4" />

      <Title level={5} className="uppercase text-[12px] text-gray font-semibold">
        Products
      </Title>
      <div className="mt-2.5 flex">
        {data.products?.map((product) => (
          <div className="w-full">
            {product.map(({ key, label }) => (
              <TextRow title={key}>{label}</TextRow>
            ))}
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {data.details?.map(({ key, label }) => (
        <TextRow title={key} className="[&>span:nth-child(2)]:!whitespace-pre-wrap [&>span:nth-child(2)]:!inline">
          {label}
        </TextRow>
      ))}
    </div>
  );
};

COTTabContent.propTypes = COTTabContentPropTypes;

export default COTTabContent;
