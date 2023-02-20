'use client';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import UploadSVG from '@/assets/images/upload.svg';
import { Sidebar, Upload } from '@/blocks';
import {
  Alert,
  Button,
  CheckBox,
  DatePicker,
  Dropdown,
  ExpandableRow,
  Input,
  Pagination,
  RadioButton,
  RangeDatePicker,
  Table,
  Tabs,
  TextArea,
  TextWithLabel,
  Toggle,
} from '@/elements';
import '@/styles/index.css';
import { FleetRowHeader, RadioWithText } from '@/ui';
import { fleetsHeader, fleetsTableRow, tabs } from '@/utils/mock';
import { sidebarData } from '@/utils/mocks';

const UiKit = () => (
  <div className="h-screen px-5 py-5">
    {/* Large Buttons */}
    <Button
      buttonProps={{ text: 'Hello', variant: 'primary', size: 'large', icon: <UploadSVG width="16px" fill="white" /> }}
    />
    <Button
      buttonProps={{ text: 'Hello', variant: 'primary', size: 'large', icon: <UploadSVG width="16px" fill="white" /> }}
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

    <Alert
      variant="access"
      title="Your request has been sent for review"
      description="You will be notified soon. The rest of the changes have been edited"
    />
    <Alert
      variant="error"
      title="Your request has been sent for review"
      description="You will be notified soon. The rest of the changes have been edited"
    />
    <Alert
      variant="warning"
      title="Your request has been sent for review"
      description="You will be notified soon. The rest of the changes have been edited"
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
  </div>
);

export default UiKit;
