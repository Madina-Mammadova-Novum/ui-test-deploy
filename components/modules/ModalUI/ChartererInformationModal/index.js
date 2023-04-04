import PropTypes from 'prop-types';

import { ModalHeader } from '@/ui';
import InformationRow from '@/ui/InformationRow';
import { chartererInfoData } from '@/utils/mock';

const ChartererInformationModal = ({ data }) => {
  // Temporary variable to display correct work of modals
  const temp = ` - ${data[1].actions[0].text}`;

  return (
    <div className="w-[610px]">
      <ModalHeader title={`Charterer Information ${temp}`} />
      <div className="mt-5">
        {chartererInfoData.map(({ key, label, countryFlag }) => (
          <InformationRow iconProps={{ src: countryFlag, alt: 'country flag' }} keyText={key} label={label} />
        ))}
      </div>
    </div>
  );
};

ChartererInformationModal.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default ChartererInformationModal;
