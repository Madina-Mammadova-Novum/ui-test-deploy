import Lottie from 'lottie-react';

import AccountLoaderData from './accountLoader.json';
import TankerLoaderData from './tankerLoader.json';

import { DynamicLoaderPropTypes } from '@/lib/types';

const animationDataMap = {
  tanker: TankerLoaderData,
  account: AccountLoaderData,
};

const DynamicLoader = ({ className = 'w-48 h-48', animationDataType = 'tanker' }) => {
  const animationData = animationDataMap[animationDataType] || TankerLoaderData;

  return (
    <div className="mt-4 flex h-48 w-full items-center justify-center">
      <Lottie className={className} animationData={animationData} speed="3" />
    </div>
  );
};

DynamicLoader.propTypes = DynamicLoaderPropTypes;

export default DynamicLoader;
