'use client';

import UploadSVG from '@/assets/images/upload.svg';
import { Button, Collapsible } from '@/elements';
import '@/styles/index.css';

const UiKit = () => (
  <div className="h-screen px-5 py-5">
    {/* Large Buttons */}
    <Button buttonProps={{ text: 'Hello', variant: 'primary-l', icon: <UploadSVG width="16px" fill="white" /> }} />
    <Button
      buttonProps={{ text: 'Hello', variant: 'primary-l', icon: <UploadSVG width="16px" fill="white" /> }}
      disabled
    />

    <Button buttonProps={{ text: 'Hello', variant: 'secondary-l' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'secondary-l' }} disabled />

    <Button buttonProps={{ text: 'Hello', variant: 'tertiary-l' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'tertiary-l' }} disabled />

    <Button buttonProps={{ text: 'Hello', variant: 'delete-l' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'delete-l' }} disabled />

    {/* Medium Buttons */}

    <Button buttonProps={{ text: 'Hello', variant: 'primary-m' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'primary-m' }} disabled />

    <Button buttonProps={{ text: 'Hello', variant: 'secondary-m' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'secondary-m' }} disabled />

    <Button buttonProps={{ text: 'Hello', variant: 'delete-m' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'delete-m' }} disabled />

    {/* Small Buttons */}

    <Button buttonProps={{ text: 'Hello', variant: 'primary-s' }} />
    <Button buttonProps={{ text: 'Hello', variant: 'primary-s' }} disabled />

    {/* Collapsible */}

    <Collapsible title="Collapsible" />
  </div>
);

export default UiKit;
