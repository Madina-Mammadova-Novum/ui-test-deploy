import { CargoesInfoModalPropTypes } from '@/lib/types';

import { cargoesTableRowsAdapter } from '@/adapters/cargoTypes';
import { Table, Title } from '@/elements';
import { recentActiveCargoesHeader } from '@/utils/mock';

const CargoesInfoModal = ({ data }) => {
  const cargoesRowData = cargoesTableRowsAdapter({ data });

  return (
    <div className="flex flex-col gap-y-5">
      <Title level="3">Cargoes chartered in the last 6 months</Title>
      <Table headerData={recentActiveCargoesHeader} rows={cargoesRowData} />
    </div>
  );
};

CargoesInfoModal.propTypes = CargoesInfoModalPropTypes;

export default CargoesInfoModal;
