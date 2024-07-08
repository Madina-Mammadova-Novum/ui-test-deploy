import Lottie from 'lottie-react';

import AccountLoaderData from './accountLoader.json';
import TankerLoaderData from './tankerLoader.json';

import { UpdatedLoaderPropTypes } from '@/lib/types';

const animationDataMap = {
  tanker: TankerLoaderData,
  account: AccountLoaderData,
};

const TankerLoader = ({ className = 'w-56 h-64', animationDataType = 'tanker' }) => {
  const animationData = animationDataMap[animationDataType] || TankerLoaderData;

  return (
    <div className="flex justify-center items-center h-56 w-full">
      <Lottie className={className} animationData={animationData} speed="3" />
    </div>
  );
};

TankerLoader.propTypes = UpdatedLoaderPropTypes;

export default TankerLoader;
