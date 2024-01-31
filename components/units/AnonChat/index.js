'use client';

import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ChatMessage } from '..';
import ChatModal from '../ChatModal';

import { AnonChatPropTypes } from '@/lib/types';

import { sessionAdapter } from '@/adapters/user';
import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Dropdown, Input, PhoneInput } from '@/elements';
import { ROLES } from '@/lib';
import { getChatToken, getCities } from '@/services';
import { chatNotificationService, сhatSessionService } from '@/services/signalR';
import { resetUser, setOpenedChat } from '@/store/entities/chat/slice';
import { getAnonChatSelector, getGeneralDataSelector } from '@/store/selectors';
import { convertDataToOptions, countriesOptions, extractTimeFromDate, setCookie } from '@/utils/helpers';
import { steps } from '@/utils/mock';

const AnonChat = ({ isOpened }) => {
  const updatedStep = { ...steps[1], time: extractTimeFromDate(new Date()) };

  const [flow, setFlow] = useState([updatedStep]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues: {
      init: false,
      role: { message: null },
      company: { message: null },
      phone: { message: null },
      email: { message: null },
      location: {
        country: null,
        city: null,
        message: null,
      },
    },
  });

  const { register, setValue, getValues, watch, reset, handleSubmit } = methods;

  const data = getValues();
  const initialization = watch('init');

  const country = watch('location.country');
  const city = watch('location.city');

  const { countries } = useSelector(getGeneralDataSelector);

  const { messages } = useSelector(getAnonChatSelector).chats?.user;

  const currentStep = flow[flow.length - 1];

  const fetchCities = async (id) => {
    const res = await getCities(id);
    const params = convertDataToOptions(res, 'cityId', 'cityName');
    return { options: params };
  };

  const fetchChatRoom = async () => {
    const { data: token } = await getChatToken({ data });

    const session = sessionAdapter({ token });

    if (session.accessToken) {
      setCookie('session-user-id', session.userId);
      setCookie('session-user-role', session.role);

      await сhatSessionService.init({ chatId: token.chatId, accessToken: session.accessToken });
      await chatNotificationService.init({ accessToken: session.accessToken });
    }
  };

  const handleClose = async () => {
    await chatNotificationService.stop();
    await сhatSessionService.stop();

    reset();
    setFlow([updatedStep]);
    dispatch(resetUser());
    dispatch(setOpenedChat(false));
  };

  const handleCountryChange = async (params) => {
    const { label, value } = params;
    const { options } = await fetchCities(value);

    setValue('location.country', { id: value, label });
    setValue('location.city', null);

    if (!city) {
      setCities([]);
    }

    if (options.length > 0) {
      setCities(options);
    }
  };

  const handleCityChange = (option) => {
    setValue(`location.city`, option);
  };

  const handleCollapse = () => dispatch(setOpenedChat(false));

  const handleNextStep = () => {
    setFlow((prevState) => [...prevState, { ...steps[prevState.length + 1], time: extractTimeFromDate(new Date()) }]);
  };

  const successCallback = () => {
    setValue('init', false);

    handleNextStep();
  };

  useEffect(() => {
    if (currentStep.key === 'connection') {
      setValue('init', true);
      fetchChatRoom().then(successCallback);
    }
  }, [currentStep.key]);

  /* Submit handler used for switching steps and init conversation with support */
  const onSubmit = async () => {
    if (country && city) {
      setValue('location.message', `${country.label}, ${city.label}`);
    }

    if (currentStep.key !== 'question') {
      handleNextStep();
    } else {
      сhatSessionService.sendMessage({ message });
      setMessage('');
    }
  };

  const handleMessage = ({ target: { value } }) => setMessage(value);
  const handleEnter = ({ charCode }) => charCode === 13 && onSubmit();

  /* Render the message */
  const printMessage = ({ sender, id, message: text, time }) => {
    return <ChatMessage key={id} sender={sender} time={time} message={text} isBroker={ROLES.ANON !== sender} />;
  };

  /* Render the real conversation with support */
  const printMessages = ({ data: content, id }) => {
    return (
      <div className="flex flex-col" key={id}>
        {content?.map(printMessage)}
      </div>
    );
  };

  /* Dynamic render form elements by key */
  const printFormElement = ({ key, props }) => {
    switch (key) {
      case 'role':
        return props.map((el) => (
          <Button
            key={el.text}
            onClick={() => {
              setValue(key, { value: el.value, message: el.text });
              handleNextStep();
            }}
            buttonProps={{ text: el.text, variant: 'primary', size: 'medium' }}
          />
        ));
      case 'company':
        return (
          <div className="flex w-full items-end gap-x-2">
            <Input {...register(`${[key]}.message`, { required: true })} {...props} />
            <Button
              type="submit"
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </div>
        );
      case 'location':
        return (
          <div className="flex w-full items-end gap-x-2">
            <div className="flex flex-col gap-y-2.5 w-full">
              <Dropdown
                label="Country"
                onChange={handleCountryChange}
                options={countriesOptions(countries)}
                customStyles={{ className: 'w-full' }}
                loading={!countries?.length}
                menuPlacement="auto"
                asyncCall
              />
              <Dropdown
                label="City"
                onChange={handleCityChange}
                options={cities}
                disabled={!cities.length}
                loading={!cities.length}
                customStyles={{ className: 'w-full' }}
                menuPlacement="auto"
                asyncCall
              />
            </div>
            <Button
              type="submit"
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </div>
        );
      case 'phone':
        return (
          <div className="flex w-full items-end gap-x-2">
            <PhoneInput {...register(`${[key]}.message`, { required: true })} label="Phone number" />
            <Button
              type="submit"
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </div>
        );
      case 'connection':
        return null;
      case 'email':
        return (
          <div className="flex w-full items-end gap-x-2">
            <Input {...register(`${[key]}.message`, { required: true })} {...props} />
            <Button
              type="submit"
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </div>
        );
      default:
        return (
          <div className="flex flex-col w-full gap-y-2">
            {messages.length > 0 && messages.map(printMessages)}
            <div className="flex w-full items-end gap-x-2">
              <Input
                type="text"
                value={message}
                onChange={handleMessage}
                onKeyPress={handleEnter}
                placeholder="Message ..."
                customStyles="!border-gray-darker !w-full"
                disabled={initialization}
              />
              <Button
                type="submit"
                customStyles="border border-gray-darker !p-2.5"
                disabled={initialization}
                buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
              />
            </div>
          </div>
        );
    }
  };

  /* Render the conversation with support */
  const printConversation = (step, index) => {
    if (data[step.key]?.message) {
      return printMessage({ time: step.time, message: data[step.key].message, sender: ROLES.ANON });
    }

    return (
      <div className={`flex ${step.key === 'role' ? 'justify-end' : 'grow items-end'} w-full gap-2.5`}>
        {printFormElement({ key: steps[index + 1].key, props: steps[index + 1].userProps })}
      </div>
    );
  };

  return (
    <ChatModal
      useCollapse
      loading={initialization}
      isOpened={isOpened}
      onClose={handleClose}
      onCollapse={handleCollapse}
    >
      <div className="px-2.5 py-2.5 relative">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="h-[468px] overflow-y-auto relative flex flex-col px-2.5">
            {flow.map((step, index) => {
              return (
                <Fragment key={step.key}>
                  {step.support && printMessage({ ...step.support, time: step.time })}
                  {printConversation(step, index)}
                </Fragment>
              );
            })}
          </form>
        </FormProvider>
      </div>
    </ChatModal>
  );
};

AnonChat.propTypes = AnonChatPropTypes;

export default AnonChat;
