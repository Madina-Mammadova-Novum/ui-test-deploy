'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatMessage } from '..';
import ChatModal from '../ChatModal';

import { AnonChatPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { sessionAdapter } from '@/adapters/user';
import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Dropdown, Input, PhoneInput } from '@/elements';
import { ROLES } from '@/lib';
import { getChatToken, getCities, getCountries, sendChatMessage } from '@/services';
import { chatNotificationService, сhatSessionService } from '@/services/signalR';
import { messageAlert, resetChat, resetUser, setBotMessage, setOpenedChat, setUser } from '@/store/entities/chat/slice';
import { getAnonChatSelector, getAuthSelector } from '@/store/selectors';
import { addLocalDateFlag, checkEmailPrefix, convertDataToOptions, countriesOptions, setCookie } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';
import { steps } from '@/utils/mock';

const AnonChat = ({ opened }) => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const footerRef = useRef();
  const updatedStep = { ...steps[1], time: addLocalDateFlag(new Date().toISOString()) };

  const [flow, setFlow] = useState([updatedStep]);
  const [city, setCity] = useState({ value: null, label: null });
  const [country, setCountry] = useState({ value: null, label: null });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const { chat, data } = useSelector(getAnonChatSelector);

  const currentStep = flow[flow.length - 1];

  const { authorized } = useSelector(getAuthSelector);

  const initServices = async () => {
    await Promise.all([
      сhatSessionService.init({ chatId: session.chatId, token: session.accessToken }),
      chatNotificationService.init({ token: session.accessToken }),
    ]);
  };

  const fetchCities = async (id) => {
    const res = await getCities(id);
    const params = convertDataToOptions(res, 'cityId', 'cityName');
    return { options: params };
  };

  const fetchChatRoom = async () => {
    const { data: token, error } = await getChatToken({ data });

    const result = sessionAdapter({ token });

    if (error) {
      errorToast(error.title, error.message);
      setDisabled(true);
    }

    dispatch(setUser({ chatId: result?.chatId }));
    setSession(result);
  };

  const markMessagesAsRead = useCallback(async () => {
    const messageIds = chat?.messages?.flatMap((item) => item.data.map((entry) => entry.id)) || [];

    if (messageIds.length > 0) {
      for (const id of messageIds) {
        // eslint-disable-next-line no-await-in-loop
        сhatSessionService.readMessage({ id });
      }
    }
  }, [chat?.messages]);

  const handleClose = async () => {
    await Promise.all([chatNotificationService.stop(), сhatSessionService.stop()]);
    сhatSessionService.onToggle(false);

    setFlow([updatedStep]);
    dispatch(resetUser());
    dispatch(resetChat());
    dispatch(setOpenedChat(false));
  };

  const handleCountryChange = async (params) => {
    const { label, value } = params;
    const { options } = await fetchCities(value);

    setCountry({ value, label });
    setCity({ value: null, label: null });

    if (!city.value) {
      setCities([]);
    }

    if (options.length > 0) {
      setCities(options);
    }
  };

  const handleCityChange = (option) => setCity(option);

  const handleMessage = ({ target: { value } }) => setMessage(value);

  const handlePhoneMessage = (value) => {
    if (value.length < 5) {
      setDisabled(true);
    } else {
      setMessage(value);
      setDisabled(false);
    }
  };

  const handleCollapse = () => dispatch(setOpenedChat(false));

  const handleNextStep = () => {
    setMessage('');
    setCity({ value: null, label: null });
    setCountry({ value: null, label: null });

    setFlow((prevState) => [
      ...prevState,
      { ...steps[prevState.length + 1], time: addLocalDateFlag(new Date().toISOString()) },
    ]);
  };

  const successCallback = () => {
    dispatch(setBotMessage({ key: 'init', message: false }));
  };

  const handleBotMessage = ({ key, answer, ...rest }) => {
    dispatch(setBotMessage({ key, message: answer, ...rest }));
    handleNextStep();
  };

  /* Submit handler used for switching steps and init conversation with support */
  const onSubmit = async (e) => {
    e?.preventDefault();

    const chatId = session?.chatId;

    sendChatMessage({ chatId, message });
    setMessage('');
  };

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
            onClick={() => handleBotMessage({ key, answer: el.text })}
            buttonProps={{ text: el.text, variant: 'primary', size: 'medium' }}
          />
        ));
      case 'name':
      case 'surname':
      case 'company':
        return (
          <form
            className="flex w-full items-end gap-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleBotMessage({ key, answer: message });
            }}
          >
            <Input {...props} onChange={handleMessage} />
            <Button
              type="submit"
              disabled={disabled}
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </form>
        );
      case 'location':
        return (
          <div className="flex w-full items-end gap-x-2">
            <div className="flex w-full flex-col gap-y-2.5">
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
                label="State/City"
                onChange={handleCityChange}
                options={cities}
                disabled={!cities.length}
                customStyles={{ className: 'w-full' }}
                menuPlacement="auto"
                asyncCall
              />
            </div>
            <Button
              onClick={() =>
                handleBotMessage({ key: 'location', answer: `${country.label}, ${city.label}`, cityId: city.value })
              }
              disabled={disabled}
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </div>
        );
      case 'phone':
        return (
          <div className="flex w-full items-end gap-x-2">
            <PhoneInput onChange={handlePhoneMessage} label="Phone number" />
            <Button
              disabled={disabled}
              onClick={() => handleBotMessage({ key, answer: message })}
              customStyles="border border-gray-darker !p-2.5"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </div>
        );
      case 'email':
        return (
          <form
            className="relative flex w-full items-end gap-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleBotMessage({ key, answer: message });
            }}
          >
            <Input onChange={handleMessage} {...props} />
            <Button
              type="submit"
              disabled={!checkEmailPrefix(message)}
              customStyles="border border-gray-darker !p-2.5 relative"
              buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
            />
          </form>
        );
      case 'connection':
        return null;
      default:
        return (
          <div className="flex w-full flex-col gap-y-2">
            {chat?.messages.length > 0 && chat?.messages?.map(printMessages)}
            <form className="flex w-full items-end gap-x-2" onSubmit={onSubmit}>
              <Input
                type="text"
                value={message}
                onChange={handleMessage}
                placeholder="Message ..."
                customStyles="!border-gray-darker !w-full"
                disabled={data?.init?.message || !session}
              />
              <Button
                type="submit"
                customStyles="border border-gray-darker !p-2.5"
                disabled={data?.init?.message || disabled || !session}
                buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
              />
            </form>
          </div>
        );
    }
  };

  /* Render the conversation with support */
  const printConversation = (step, index) => {
    if (data[step.key]?.message) {
      return printMessage({ time: step.time, message: data[step.key]?.message, sender: ROLES.ANON });
    }

    return (
      <div className={`flex ${step.key === 'role' ? 'justify-end' : 'grow items-end'} w-full gap-2.5`}>
        {printFormElement({ key: steps[index + 1]?.key, props: steps[index + 1]?.userProps })}
      </div>
    );
  };

  dropDownOptionsAdapter({ data: countries?.data });

  const fetchCountries = async () => {
    const { data: countriesData } = await getCountries();

    setCountries([...countriesData]);
  };

  useEffect(() => {
    handleClose();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (session?.accessToken) {
      setCookie('session-user-id', session?.userId);
      setCookie('session-user-role', session?.role);
      setCookie('session-access-token', session?.accessToken);
      setCookie('session-refresh-token', session?.refreshToken);

      initServices();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    const container = containerRef.current;
    chatNotificationService.onToggle(opened);

    if (opened) {
      container.scrollTop = container.scrollHeight;
      dispatch(messageAlert({ chatId: session?.chatId, messageCount: 0 }));

      if (session?.accessToken) {
        markMessagesAsRead();
      }
    }
  }, [opened, session?.accessToken]);

  useEffect(() => {
    if (currentStep.key === 'connection') {
      handleBotMessage({ key: 'init', answer: true });
      fetchChatRoom().then(successCallback);
    }
  }, [currentStep.key]);

  useEffect(() => {
    footerRef?.current?.scrollIntoView();
  }, [flow, chat?.messages]);

  useEffect(() => {
    if (message || (country.value && city.value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message, country.value, city.value]);

  useEffect(() => {
    if (authorized) {
      сhatSessionService.onToggle(false);
    }
  }, [authorized]);

  return (
    <ChatModal
      useCollapse
      loading={data?.init?.message}
      isOpened={opened}
      onClose={handleClose}
      onCollapse={handleCollapse}
    >
      <div className="relative px-2.5 py-2.5">
        <div ref={containerRef} className="relative flex h-[468px] flex-col overflow-y-auto px-2.5">
          {flow.map((step, index) => {
            return (
              <Fragment key={step.key}>
                {step.support && printMessage({ ...step.support, time: step.time })}
                {printConversation(step, index)}
              </Fragment>
            );
          })}
          <div ref={footerRef} />
        </div>
      </div>
    </ChatModal>
  );
};

AnonChat.propTypes = AnonChatPropTypes;

export default AnonChat;
