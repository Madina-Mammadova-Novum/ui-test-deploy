import React, { useState } from 'react';

import usFlag from '@/assets/images/flag.png';
import { Button, InformationRow, Modal, Title } from '@/elements';
import OfferModalContent from '@/modules/OfferModalContent';

const ExpandedContent = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);
  return (
    <div className="mt-3 mb-5">
      <Title component="h3">Tanker Information</Title>

      <div className="md:flex text-xsm mt-2.5 gap-x-20">
        <div>
          <Title component="h5" className="text-[12px] text-gray font-semibold mb-1.5">
            About the Vessel Owner
          </Title>

          <InformationRow keyTextProps={{ keyText: 'Years in Operation:' }} labelProps={{ label: '3-5 years' }} />
          <InformationRow keyTextProps={{ keyText: 'Number of Tankers:' }} labelProps={{ label: '6-10 tankers' }} />
          <InformationRow
            keyTextProps={{ keyText: 'Estimated average tanker DWT:' }}
            labelProps={{ label: '21-40 kt' }}
          />
        </div>

        <div className="mt-2.5 md:mt-0">
          <Title component="h5" className="text-[12px] text-gray font-semibold mb-1.5">
            About the Tanker
          </Title>
          <div className="flex gap-x-10">
            <div>
              <InformationRow keyTextProps={{ keyText: 'Ship age:' }} labelProps={{ label: '≤ 5' }} />
              <InformationRow keyTextProps={{ keyText: 'Cubic capacity 98%:' }} labelProps={{ label: '25,*** m³' }} />
              <InformationRow keyTextProps={{ keyText: 'Number of Segregations:' }} labelProps={{ label: '5' }} />
              <InformationRow keyTextProps={{ keyText: 'LOA:' }} labelProps={{ label: '100 m' }} />
              <InformationRow keyTextProps={{ keyText: 'Beam:' }} labelProps={{ label: '23 m' }} />
              <InformationRow keyTextProps={{ keyText: 'Type of Hull:' }} labelProps={{ label: 'Double Hull' }} />
            </div>

            <div>
              <InformationRow
                keyTextProps={{ keyText: 'Country of Registered Owner:' }}
                labelProps={{ label: 'Turkey' }}
                iconProps={{ src: usFlag, alt: 'flag' }}
              />
              <InformationRow
                keyTextProps={{ keyText: 'Country of Disponent Owner:' }}
                labelProps={{ label: 'The Netherlands' }}
                iconProps={{ src: usFlag, alt: 'flag' }}
              />
              <InformationRow
                keyTextProps={{ keyText: 'Country of Technical Operator:' }}
                labelProps={{ label: 'The Netherlands' }}
                iconProps={{ src: usFlag, alt: 'flag' }}
              />
              <InformationRow
                keyTextProps={{ keyText: 'Country of Commercial Operator:' }}
                labelProps={{ label: 'Turkey' }}
                iconProps={{ src: usFlag, alt: 'flag' }}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        buttonProps={{ variant: 'primary', size: 'large', text: 'Send offer' }}
        customStyles="mt-5 ml-auto"
        onClick={handleOpenModal}
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        <OfferModalContent closeModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ExpandedContent;
