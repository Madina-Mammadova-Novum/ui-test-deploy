import { IconComponent, TextRow, Title } from '@/elements';
import { unauthorizedSearchExpandedData } from '@/utils/mock';

const ExpandedContent = () => {
  const { vesselOwnerData, tankerData, countryData } = unauthorizedSearchExpandedData;
  return (
    <div className="mt-3 mb-5">
      <Title level={3}>Tanker Information</Title>

      <div className="md:flex text-xsm mt-2.5 gap-x-20">
        {vesselOwnerData.length && (
          <div>
            <Title level="5" className="text-xs-sm text-gray font-semibold mb-1.5 uppercase">
              About the Vessel Owner
            </Title>
            {vesselOwnerData.map(({ title, description }) => (
              <TextRow title={title}>{description}</TextRow>
            ))}
          </div>
        )}

        <div className="mt-2.5 md:mt-0">
          <Title level="5" className="text-xs-sm text-gray font-semibold mb-1.5 uppercase">
            About the Tanker
          </Title>
          <div className="flex gap-x-10">
            {tankerData.length && (
              <div>
                {tankerData.map(({ title, description }) => (
                  <TextRow title={title}>{description}</TextRow>
                ))}
              </div>
            )}

            {countryData.length && (
              <div>
                {countryData.map(({ title, description, icon }) => (
                  <TextRow title={title}>
                    <IconComponent icon={icon} />
                    {description}
                  </TextRow>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedContent;
