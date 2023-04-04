'use client';

import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { CloseDialog } from '@/assets';
import { Input, PhoneField, TextArea } from '@/elements';
import Button from '@/elements/Button';
import { getNumbersFromString } from '@/utils/helpers';
import { useOnClickOutside, useValidationErrors } from '@/utils/hooks';
import { validateEmailRegex, validateMinValueString, validateRequiredField } from '@/utils/validation';

const JoinTeamModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const { errors, addError, removeErrorByKey } = useValidationErrors();
  const modalRef = useRef();

  useOnClickOutside(modalRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFormDataChanged = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const newFormData = {
      ...formData,
    };

    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleJoinTeam = (event) => {
    // TODO: Add form submit
    if (Object.keys(errors).length > 0) {
      console.log('There are validation errors');
      return;
    }
    console.log('Form submitted');
    event.preventDefault();
  };

  const handleValidateEmail = (event) => {
    return (
      validateRequiredField(event.target.name, event.target.value, errors, addError, removeErrorByKey) &&
      validateEmailRegex(event.target.name, event.target.value, errors, addError, removeErrorByKey)
    );
  };

  const handleValidatePhone = (event) => {
    return (
      validateRequiredField(event.target.name, event.target.value, errors, addError, removeErrorByKey) &&
      validateMinValueString(
        event.target.name,
        getNumbersFromString(event.target.value),
        errors,
        addError,
        removeErrorByKey
      )
    );
  };

  return (
    <div className="fixed bottom-0 top-0 flex items-start justify-center z-10 p-5 bg-[#2D2D2DCC] w-full 2xs:items-center sm:px-[100px] overflow-scroll">
      <div
        className="relative w-full min-h-max overflow-scroll max-w-[848px] bg-white rounded-[10px] px-4 py-8 sm:px-10 sm:py-14 md:px-[145px]"
        ref={modalRef}
      >
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6">
          <CloseDialog onClick={closeModal} />
        </div>
        <div>
          <h2 className="text-2xl text-black font-bold text-center mb-4 sm:text-3xl md:text-4xl">
            Eager to help women be healthier?
          </h2>
          <p className="text-sm text-gray text-center">
            We’re glad you are interested to join our team. Tell us more about yourself and we’ll be happy to contact
            you!
          </p>
        </div>
        <form className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
          <div className="col-span-1">
            <Input
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              isError={!!errors?.firstName}
              errorMessage={errors?.firstName}
              onBlur={(event) =>
                validateRequiredField(event.target.name, event.target.value, errors, addError, removeErrorByKey)
              }
              onChange={handleFormDataChanged}
            />
          </div>
          <div className="col-span-1">
            <Input
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              customStyles="col-span-1"
              value={formData.lastName}
              isError={!!errors?.lastName}
              errorMessage={errors?.lastName}
              onBlur={(event) =>
                validateRequiredField(event.target.name, event.target.value, errors, addError, removeErrorByKey)
              }
              onChange={handleFormDataChanged}
            />
          </div>
          <div className="col-span-1">
            <Input
              id="email"
              label="Email"
              name="email"
              placeholder="john.doe@gmail.com"
              customStyles="col-span-1"
              value={formData.email}
              isError={!!errors?.email}
              errorMessage={errors?.email}
              onBlur={handleValidateEmail}
              onChange={handleFormDataChanged}
            />
          </div>
          <div className="col-span-1">
            <PhoneField
              id="phone"
              name="phone"
              label="Phone number"
              value={formData.phone}
              isError={!!errors?.phone}
              errorMessage={errors?.phone}
              onBlur={handleValidatePhone}
              onChange={handleFormDataChanged}
            />
          </div>
          <div className="md:col-span-2">
            <TextArea
              id="message"
              name="message"
              label="Tell us more about yourself and your background"
              placeholder="Type here..."
              value={formData.message}
              onChange={handleFormDataChanged}
            />
          </div>
          <div className="place-self-center md:mt-2 md:col-span-2">
            <Button
              button={{ label: 'Join the team', buttonOptions: { style: 'primary' } }}
              customStyles="max-w-[172px]"
              onClick={handleJoinTeam}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

JoinTeamModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default JoinTeamModal;
