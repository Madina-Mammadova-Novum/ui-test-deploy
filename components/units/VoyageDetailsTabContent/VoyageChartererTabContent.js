import InfoSVG from '@/assets/images/infoCircle.svg';
import { ManualTooltip } from '@/elements';
import ChartererInformationContent from '@/units/ChartererInformationContent';

const VoyageChartererTabContent = () => {
  return (
    <>
      <span className="mr-1.5">Charterer Information</span>
      <ManualTooltip className="!right-0 min-w-[260px] !p-2.5" data={{ description: <ChartererInformationContent /> }}>
        <InfoSVG className="w-4" viewBox="0 0 24 24" />
      </ManualTooltip>
    </>
  );
};

export default VoyageChartererTabContent;
