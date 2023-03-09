'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { ModalManager } from '@/common';
import { Modal } from '@/elements';
import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows }) => {
  const [modalId, setModalId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleActionClick = ({ id, data }) => {
    setModalId(id);
    setModalData(data);
  };

  const handleCloseModal = () => {
    setModalId(null);
    setModalData(null);
  };

  return (
    <div className="overflow-auto">
      <div
        className="border border-gray-darker rounded-[10px] overflow-hidden font-semibold min-w-[1152px]"
        style={{ marginTop: '12px', marginBottom: '21px' }}
      >
        <table className="my_position-table w-full border-collapse">
          {headerData.length && <TableHeader headerData={headerData} />}
          {rows.length &&
            rows.map((rowData) => (
              <TableRow
                handleActionClick={(params) => handleActionClick({ ...params, data: rowData })}
                rowData={rowData}
              />
            ))}
        </table>
      </div>
      {modalId && (
        <Modal closeModal={handleCloseModal}>
          <ModalManager modalId={modalId} data={modalData} setModalId={setModalId} closeModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

Table.defaultProps = {
  headerData: [],
  rows: [],
};

Table.propTypes = {
  headerData: PropTypes.shape([]),
  rows: PropTypes.shape([]),
};

export default Table;
