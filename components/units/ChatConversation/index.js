'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import ChatConversationBody from './ChatConversationBody';
import СhatConversationHeader from './СhatConversationHeader';

import { ChatConversationPropTypes } from '@/lib/types';

import { fileErrorAdapter, fileReaderAdapter } from '@/adapters/fileAdapter';
import FileUploadSVG from '@/assets/images/fileUpload.svg';
import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { AVAILABLE_FORMATS } from '@/lib/constants';
import { сhatSessionService } from '@/services/signalR';
import { getChatHistory } from '@/store/entities/chat/actions';
import { getAuthChatSelector } from '@/store/selectors';
import { IconUpload } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const ChatConversation = ({ isOpened, isMediumScreen, onCloseSession, onCollapseSession, isChatModalOpened }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = getCookieFromBrowser('session-access-token');

  const { chats } = useSelector(getAuthChatSelector);
  const { data, updating } = chats?.user;

  // Create accept object from AVAILABLE_FORMATS
  const acceptFormats = {};

  // Map file extensions to MIME types
  const mimeTypeMap = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.odt': 'application/vnd.oasis.opendocument.text',
    '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
    '.odp': 'application/vnd.oasis.opendocument.presentation',
    '.rtf': 'application/rtf',
    '.tsv': 'text/tab-separated-values',
  };

  // Group extensions by MIME type
  AVAILABLE_FORMATS.DOCS.forEach((ext) => {
    const mimeType = mimeTypeMap[ext];
    if (mimeType) {
      if (!acceptFormats[mimeType]) {
        acceptFormats[mimeType] = [];
      }
      acceptFormats[mimeType].push(ext);
    }
  });

  const handleFileUpload = useCallback(async (acceptedFiles, rejections) => {
    if (rejections && rejections.length > 0) {
      // Handle rejected files
      const errorMessage = fileErrorAdapter({ data: rejections[0]?.errors });
      errorToast('File Upload Error', errorMessage.message);
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      // Set uploading state
      setUploading(true);

      // Process files one by one (fileReaderAdapter is designed for single file)
      for (const file of acceptedFiles) {
        try {
          // Create setValue and setError functions that work with our component
          const setValue = (key, value) => {
            if (key === 'file' && value) {
              // Send the file URL using the sendFile method
              сhatSessionService.sendFile({
                fileUrl: value,
                fileName: file.name,
              });
            }
          };

          const setError = (key, error) => {
            if (key === 'file' && error) {
              console.error('File upload failed:', error);
              errorToast('Upload Failed', error.message || 'Failed to upload file');
            }
          };

          // Use fileReaderAdapter with our custom setValue and setError functions
          fileReaderAdapter(file, setValue, setError, setUploading);
        } catch (error) {
          console.error('Error uploading file:', error);
          errorToast('Upload Error', 'An unexpected error occurred while uploading the file');
        }
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: handleFileUpload,
    noClick: true, // Disable click behavior on the root
    multiple: true,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: acceptFormats,
  });

  const initChatActions = useCallback(async () => {
    сhatSessionService.onToggle(isOpened);

    if (isOpened) {
      await сhatSessionService.init({ chatId: data.chatId, token });
      dispatch(getChatHistory({ data: { id: data?.chatId } }));
    }
  }, [data?.chatId, isOpened, token]);

  useEffect(() => {
    initChatActions();
  }, [isOpened, token, data?.chatId]);

  useEffect(() => {
    if (message !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    сhatSessionService.sendMessage({ message });
    setMessage('');
  };

  const handleMessage = ({ target: { value } }) => setMessage(value);

  const setConversationPosition = useMemo(() => {
    if (isMediumScreen && isOpened) return 'right-24';
    if (!isChatModalOpened && isOpened) return 'right-24';
    return 'right-[480px]';
  }, [isMediumScreen, isOpened, isChatModalOpened]);

  // Get the appropriate border color based on drag state
  const getBorderColor = () => {
    if (isDragAccept) return 'border-green-500';
    if (isDragReject) return 'border-red-500';
    if (isDragActive) return 'border-blue-500';
    return 'border-gray-light';
  };

  return (
    isOpened && (
      <div
        className={`fixed border ${getBorderColor()} bg-white ${setConversationPosition} z-100 bottom-6 h-auto w-[360px] rounded-base shadow-xmd transition-colors duration-200 md:z-10`}
      >
        <СhatConversationHeader
          data={data}
          updating={updating || uploading}
          typing={data?.isTyping}
          onClose={onCloseSession}
          onCollapse={onCollapseSession}
        />
        <div className="flex flex-col p-2.5" {...getRootProps()}>
          {isDragActive && (
            <div className="z-100 absolute inset-0 flex flex-col items-center justify-center rounded-base bg-blue-50 bg-opacity-90 p-4 md:z-10">
              <FileUploadSVG className="mb-2 fill-blue-500" />
              <p className="mb-12 text-center text-blue-700">
                {isDragReject ? 'Some files are not supported' : 'Drop your files here to upload'}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-blue-500">Supported formats: {AVAILABLE_FORMATS.DOCS.join(', ')}</p>
                <p className="text-sm text-blue-500">Max file size: 10MB</p>
              </div>
            </div>
          )}

          <ChatConversationBody />
          <form className="flex w-full grow items-end gap-x-2.5" onSubmit={handleSubmit}>
            <div className={`flex w-full gap-2.5 ${data?.deactivated ? 'flex-col' : 'flex-row'}`}>
              <div className="relative flex w-full items-center">
                <Input
                  type="text"
                  value={message}
                  onChange={handleMessage}
                  placeholder={uploading ? 'Uploading files...' : 'Message ...'}
                  disabled={uploading}
                  customStyles="!border-gray-darker !w-full"
                />
                {!data?.deactivated && (
                  <div className="absolute right-2">
                    <IconUpload getInputProps={getInputProps} onClick={() => {}} disabled={uploading} />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={disabled || uploading}
                customStyles="border border-gray-darker w-full !p-2.5"
                buttonProps={{
                  variant: 'tertiary',
                  size: 'small',
                  icon: { before: !data?.deactivated && <PlaneSVG /> },
                  text: data?.deactivated ? 'Request to deactivate' : '',
                }}
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

ChatConversation.propTypes = ChatConversationPropTypes;

export default ChatConversation;
