import OtakoyiLogo from '@/assets/images/otakoyi.svg';
import { NextLink } from '@/elements';

const OtakoyiSign = () => {
  return (
    <div className="flex items-center gap-x-2">
      <p className="text-gray text-xsm">Development by</p>
      <NextLink href="https://otakoyi.software/" target="_blank">
        <OtakoyiLogo />
      </NextLink>
    </div>
  );
};

export default OtakoyiSign;
