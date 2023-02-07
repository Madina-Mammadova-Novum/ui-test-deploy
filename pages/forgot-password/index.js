import React, { useState } from 'react';

import delve from 'dlv';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { HeaderAuth } from '@/common';
import { Button, Input } from '@/elements';
import { ROUTES } from '@/lib/constants';
import { getForgotPasswordContent, getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';
import { useValidationErrors } from '@/utils/hooks';
import { validateEmailRegex, validateRequiredField } from '@/utils/validation';

const ForgotPassword = ({ title, description, coverImage }) => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const { errors, addError, removeErrorByKey } = useValidationErrors();
  const { t } = useTranslation();

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

  const handleResentLink = (event) => {
    event.preventDefault();
    /* TODO: add resent link logic */
    console.log('Resent Link');
  };

  const handleValidateEmail = (event) => {
    return (
      validateRequiredField(event.target.name, event.target.value, errors, addError, removeErrorByKey) &&
      validateEmailRegex(event.target.name, event.target.value, errors, addError, removeErrorByKey)
    );
  };

  return (
    <div className="bg-[#F4F4F4]">
      <HeaderAuth
        text={t('return_to')}
        link={{
          id: makeId(),
          href: ROUTES.LOGIN,
          label: t('login'),
          linkOptions: {
            target: '_self',
            isExternal: false,
            style: 'default',
          },
        }}
      />
      <div className="flex flex-col items-center justify-center h-screen w-full md:flex-row md:justify-start">
        {coverImage && (
          <div className="hidden relative md:min-w-[603px] 2lg:min-w-[803px] h-full md:block">
            <Image
              width={803}
              height={970}
              alt={delve(coverImage, 'alternativeText')}
              src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
              className="h-full w-full object-cover object-center"
              quality={75}
            />
            {description && <h3 className="absolute bottom-10 left-20 text-4xl text-white font-bold">{description}</h3>}
          </div>
        )}
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-start w-full gap-y-8 px-4 max-w-[516px] md:max-w-[305px] 2lg:max-w-[412px] md:px-0">
            <div>
              {title && <h2 className="text-2xl font-bold max-w-[516px] sm:text-3xl">{title}</h2>}
              <p className="text-sm text-gray mt-3">{t('reset_password_subtitle')}</p>
            </div>

            <form className="grid grid-cols-1 gap-y-6">
              <div className="col-span-1">
                <Input
                  id="email"
                  name="email"
                  label={t('email')}
                  placeholder={t('email_placeholder')}
                  value={formData.email}
                  isError={!!errors?.email}
                  errorMessage={errors?.email}
                  onBlur={handleValidateEmail}
                  onChange={handleFormDataChanged}
                />
              </div>
            </form>
            <div>
              <Button
                button={{ label: t('sent_resent_password_link'), buttonOptions: { style: 'primary' } }}
                customStyles="w-full !max-w-none justify-center"
              />
              <div className="flex gap-x-4 mt-6">
                <p className="text-xsm text-gray">{t('didnt_get_email')}</p>
                <Button
                  button={{ label: t('resent_link'), buttonOptions: { style: 'base' } }}
                  onClick={handleResentLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.defaultProps = {
  title: '',
  description: '',
  coverImage: null,
};

ForgotPassword.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  coverImage: mediaPropTypes,
};

export async function getStaticProps({ locale }) {
  const staticProps = await getForgotPasswordContent();
  return {
    props: {
      ...staticProps,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default ForgotPassword;
