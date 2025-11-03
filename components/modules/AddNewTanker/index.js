'use client';

import { useEffect, useMemo, useState } from 'react';

import { AddNewTankerPropTypes } from '@/lib/types';

import { unassignedFleetOption } from '@/lib/constants';
import { getUserFleets } from '@/services';
import { AddTankerForm, AddTankerManuallyForm } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const AddNewTanker = ({ closeModal }) => {
  const [step, setStep] = useState('initial');
  const [selectedFleet, setSelectedFleet] = useState(unassignedFleetOption);
  const [q88Data, setQ88Data] = useState({});
  const [allFleets, setAllFleets] = useState([]);

  useEffect(() => {
    const fetchAllFleets = async () => {
      try {
        const response = await getUserFleets({ page: 1, perPage: 100, sortBy: 'asc' });
        if (response?.data && !response.error) {
          setAllFleets(response.data);
        } else if (response?.error) {
          errorToast('Failed to load fleets', 'Please try again or contact support if the problem persists.');
        }
      } catch (error) {
        console.error('Error fetching all fleets:', error);
        errorToast('Failed to load fleets', 'Please try again or contact support if the problem persists.');
      }
    };

    fetchAllFleets();
  }, []);

  const fleetOptions = [unassignedFleetOption, ...convertDataToOptions({ data: allFleets }, 'id', 'name')];

  const handleMoveToManualForm = (formData) => {
    setSelectedFleet(formData.fleet);

    setQ88Data({
      imo: formData.imo,
      file: formData.file,
      vesselId: formData.vesselId,
    });

    setStep('manual');
  };

  const printModal = useMemo(() => {
    switch (step) {
      case 'manual':
        return (
          <AddTankerManuallyForm
            closeModal={closeModal}
            goBack={() => setStep('initial')}
            fleetData={selectedFleet}
            q88={q88Data}
          />
        );
      default:
        return (
          <AddTankerForm
            closeModal={closeModal}
            fleetOptions={fleetOptions}
            selectedFleet={selectedFleet}
            setSelectedFleet={setSelectedFleet}
            onMoveToManualForm={handleMoveToManualForm}
          />
        );
    }
  }, [step, selectedFleet, q88Data, fleetOptions, closeModal]);

  return printModal;
};

AddNewTanker.propTypes = AddNewTankerPropTypes;

export default AddNewTanker;
