'use client';

import React, { useState } from 'react';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import UploadSVG from '@/assets/images/upload.svg';
import {
  Button,
  CheckBox,
  DatePicker,
  Dropdown,
  ExpandableRow,
  Input,
  Modal,
  Pagination,
  PasswordInput,
  RadioButton,
  RangeDatePicker,
  Table,
  Tabs,
  TextArea,
  TextWithLabel,
  Toggle,
} from '@/elements';
import Tooltip from '@/elements/Tooltip';
import '@/styles/index.css';
import { FleetRowHeader, PasswordValidation, RadioWithText, Sidebar, Upload } from '@/ui';
import { useErrorToast, useInfoToast, useSuccessToast, useToast, useWarningToast } from '@/utils/hooks';
import { fleetsHeader, fleetsTableRow, sidebarData, tabs } from '@/utils/mock';
import { FormManager } from '@/common';

const UiKit = () => {
  const [modal, setModal] = useState(false);

  const handleSuccessToast = useSuccessToast(
    'Your request has been sent for review',
    'You will be notified soon. The rest of the changes have been edited'
  );

  const handleErrorToast = useErrorToast(
    'Your request has been sent for review',
    'You will be notified soon. The rest of the changes have been edited'
  );

  const handleWarningToast = useWarningToast(
    'Your request has been sent for review',
    'You will be notified soon. The rest of the changes have been edited'
  );

  const handleInfoToast = useInfoToast(
    'Your request has been sent for review',
    'You will be notified soon. The rest of the changes have been edited'
  );

  const handleDefaultToast = useToast(
    'Your request has been sent for review',
    'You will be notified soon. The rest of the changes have been edited'
  );

  return (
    <div className="px-5 py-5">
      {/* Large Buttons */}
      <Button
        buttonProps={{
          text: 'Hello',
          variant: 'primary',
          size: 'large',
          icon: <UploadSVG width="16px" fill="white" />,
        }}
      />
      <Button
        buttonProps={{
          text: 'Hello',
          variant: 'primary',
          size: 'large',
          icon: <UploadSVG width="16px" fill="white" />,
        }}
        disabled
      />

      <Button buttonProps={{ text: 'Hello', variant: 'secondary', size: 'large' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'secondary', size: 'large' }} disabled />

      <Button buttonProps={{ text: 'Hello', variant: 'tertiary', size: 'large' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'tertiary', size: 'large' }} disabled />

      <Button buttonProps={{ text: 'Hello', variant: 'delete', size: 'large' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'delete', size: 'large' }} disabled />

      {/* Medium Buttons */}

      <Button buttonProps={{ text: 'Hello', variant: 'primary', size: 'medium' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'primary', size: 'medium' }} disabled />

      <Button buttonProps={{ text: 'Hello', variant: 'secondary', size: 'medium' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'secondary', size: 'medium' }} disabled />

      <Button buttonProps={{ text: 'Hello', variant: 'delete', size: 'medium' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'delete', size: 'medium' }} disabled />

      {/* Small Buttons */}

      <Button buttonProps={{ text: 'Hello', variant: 'primary', size: 'small' }} />
      <Button buttonProps={{ text: 'Hello', variant: 'primary', size: 'small' }} disabled />

      {/* Collapsible */}
      <Sidebar data={sidebarData} />
      {/* Inputs */}

      <Input label="title" placeholder="Enter the file title" customStyles="max-w-[296px]" />
      <Input label="title" placeholder="Enter the file title" icon={<PasswordHiddenSVG className="w-5" />} />
      <Input label="title" placeholder="Enter the file title" helperText="hello" />
      <Input
        label="title"
        placeholder="Enter the file title"
        helperText="hello"
        icon={<PasswordHiddenSVG className="w-5" />}
      />
      <Input label="title" placeholder="Enter the file title" error="hello" />
      <Input
        label="title"
        placeholder="Enter the file title"
        error="hello"
        icon={<PasswordHiddenSVG className="w-5" />}
      />

      <PasswordInput label="choose new password" placeholder="Enter your password" customStyles="max-w-[296px]" />

      {/* TextAreas */}

      <TextArea label="title" placeholder="Some text" />
      <TextArea label="title" placeholder="Some text" disabled />

      {/* Toggle */}

      <div className="blocks">
        <Toggle />
      </div>

      {/* RadioButton */}

      <div className="blocks">
        <RadioButton />
      </div>

      {/* CheckBox */}

      <div className="blocks">
        <CheckBox />
      </div>

      {/* Radio with text */}

      <RadioWithText text="Sample text" />

      {/* Text with Title */}

      <TextWithLabel label="text" text="description" />

      {/* Expandable row */}

      <ExpandableRow headerComponent={<FleetRowHeader />}>
        <Table headerData={fleetsHeader} rows={fleetsTableRow} />
      </ExpandableRow>
      <br />

      {/* Alerts */}

      <div className="flex gap-5">
        <Button
          buttonProps={{ text: 'Success toast', variant: 'secondary', size: 'medium' }}
          onClick={handleSuccessToast}
        />
        <Button
          buttonProps={{ text: 'Warning toast', variant: 'secondary', size: 'medium' }}
          onClick={handleWarningToast}
        />
        <Button
          buttonProps={{ text: 'Error toast', variant: 'secondary', size: 'medium' }}
          onClick={handleErrorToast}
        />
        <Button buttonProps={{ text: 'Info toast', variant: 'primary', size: 'medium' }} onClick={handleInfoToast} />
        <Button
          buttonProps={{ text: 'Default toast', variant: 'primary', size: 'small' }}
          onClick={handleDefaultToast}
        />
      </div>

      {/* Tooltips */}

      <Tooltip
        tooltipText="Title"
        variant="manual"
        data={{
          title: 'IMO',
          content: ``,
        }}
      />

      {/* Datepickers */}

      <div style={{ marginBottom: '20px' }}>
        <DatePicker />
      </div>

      <div className="mb-5">
        <RangeDatePicker />
      </div>

      {/* Dropdowns */}

      <Dropdown label="Open Port" />

      {/* Upload form */}

      <Upload />

      {/* Pagination */}

      <Pagination pageCount={9} onPageChange={() => {}} currentPage={1} />

      {/* Tabs */}

      <Tabs tabs={tabs} defaultTab={tabs[0].value} activeTab={null} />

      {/* Password Validation */}
      <FormManager>
        <PasswordValidation title="Enter a strong password according to our requirements" />
      </FormManager>

      {/* Modal */}
      <div>
        <button type="button" onClick={() => setModal(true)}>
          click
        </button>
        {modal && (
          <Modal closeModal={() => setModal(false)}>
            <div>Hello</div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default UiKit;
