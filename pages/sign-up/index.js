import React, { useState } from 'react';

import classnames from 'classnames';
import delve from 'dlv';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { HidePassword, ShowPassword } from '@/assets';
import { HeaderAuth } from '@/common';
import { Button, Input } from '@/elements';
import { ROUTES } from '@/lib/constants';
import { getRegistrationContent, getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';
import { useValidationErrors } from '@/utils/hooks';
import { validateEmailRegex, validateRequiredField } from '@/utils/validation';

const SignUp = ({ title, description, coverImage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    privacy: false,
  });
  const [showPassword, setShowpassword] = useState(false);
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

  const handlePrivacyPolicy = (event) => {
    event.preventDefault();
    // TODO: Open Dialog Window
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
        text={t('already_have_account')}
        link={{
          id: makeId(),
          href: ROUTES.LOGIN,
          label: t('log_in'),
          linkOptions: {
            target: '_self',
            isExternal: false,
            style: 'default',
          },
        }}
      />
      <div className="flex flex-col items-center justify-center h-screen w-full md:flex-row md:justify-start">
        {coverImage && (
          <div className="hidden relative min-w-[603px] h-full md:block">
            <Image
              width={602}
              height={770}
              alt={delve(coverImage, 'alternativeText')}
              key={coverImage}
              src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
              className="h-full w-full object-cover object-center"
              quality={75}
            />
            {description && <h3 className="absolute bottom-10 left-20 text-4xl text-white font-bold">{description}</h3>}
          </div>
        )}
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-start w-full gap-y-8 px-4 max-w-[516px] md:max-w-[305px] md:px-0">
            {title && <h2 className="text-2xl font-bold max-w-[516px] sm:text-3xl">{title}</h2>}
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
              <div className="col-span-1">
                <Input
                  id="password"
                  name="password"
                  label={t('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  customStyles={classnames({
                    'text-2xl': formData.password.length > 0 && !showPassword,
                  })}
                  icon={
                    showPassword ? (
                      <HidePassword onClick={() => setShowpassword(false)} />
                    ) : (
                      <ShowPassword onClick={() => setShowpassword(true)} />
                    )
                  }
                  value={formData.password}
                  isError={!!errors?.password}
                  errorMessage={errors?.password}
                  onBlur={(event) =>
                    validateRequiredField(event.target.name, event.target.value, errors, addError, removeErrorByKey)
                  }
                  onChange={handleFormDataChanged}
                />
              </div>
              {/* TODO: add styling */}
              <div>
                <p>{t('at_leat_8_symbols')}</p>
                <p>{t('one_number')}</p>
                <p>{t('one_big_letter')}</p>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  className="w-4 h-4 border-secondary"
                  value={formData.privacy}
                  onChange={handleFormDataChanged}
                />
                <div className="flex flex-col">
                  <p className="text-xsm text-gray">
                    {t('agree_to_the')}
                    <Button
                      button={{ label: t('privacy_policy'), buttonOptions: { style: 'link' } }}
                      onClick={handlePrivacyPolicy}
                    />{' '}
                  </p>
                </div>
              </div>
            </form>
            <div>
              <Button
                button={{ label: t('create_account'), buttonOptions: { style: 'primary' } }}
                customStyles="w-full !max-w-none justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.defaultProps = {
  title: '',
  description: '',
  coverImage: null,
};

SignUp.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  coverImage: mediaPropTypes,
};

export async function getStaticProps({ locale }) {
  const staticProps = await getRegistrationContent();
  return {
    props: {
      ...staticProps,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default SignUp;
