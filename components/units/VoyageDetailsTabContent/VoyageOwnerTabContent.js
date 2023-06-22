import InfoSVG from '@/assets/images/infoCircle.svg';
import { ManualTooltip } from '@/elements';
import TankerInformationContent from '@/units/TankerInformationContent';

const VoyageOwnerTabContent = () => {
  return (
    <>
      <span className="mr-1.5">Tanker Information</span>
      <ManualTooltip
        className="!right-0 min-w-[260px] !p-2.5 w-[470px]"
        data={{ description: <TankerInformationContent /> }}
      >
        <InfoSVG className="w-4" viewBox="0 0 24 24" />
      </ManualTooltip>
    </>
  );
};

export default VoyageOwnerTabContent;
