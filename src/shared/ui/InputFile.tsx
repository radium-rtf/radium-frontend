'use client';
import { FC, ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';
import { FileType } from '../types/FileType';
import { useDrop } from '../hooks/useDrop';
import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { CloseButton } from './CloseButton';

interface IProps {
  name?: string;
  disabled?: boolean;
  maxBytesFileSize?: number;
  allowedFileTypes: FileType;
  onFileLoaded: (file: File) => void;
  children?: ReactNode;
}

export const InputFile: FC<IProps> = ({
  name,
  allowedFileTypes = FileType.zip,
  onFileLoaded,
  disabled = false,
  maxBytesFileSize = 10 ** 30,
  children = <span>.zip</span>,
}) => {
  const [file, setFile] = useState<File>();
  const [isDisabled, setDisabled] = useState(disabled);
  const [isAttachError, setAttachError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoading) {
      setAttachError(false);
      setFile(undefined);
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const files = inputRef?.current?.files;
    if (files) {
      handleFileChange(files[0]);
    }
  }, [inputRef?.current?.files, inputRef?.current?.value]);

  const inputId = useId();

  const { isDraggable: isDragging, ref: windowRef } = useDrop();
  if (window) {
    windowRef.current = window.document;
  }

  const getLabelText = () => {
    let text = 'Выберите или перетащите файл';
    if (isLoading) {
      text = 'Загружаем файл';
    } else if (isDisabled) {
      text = 'Прикрепить файл нельзя';
    } else if (isDragging) {
      text = 'Перетащите файл сюда';
    } else if (isAttachError) {
      text = 'Не получилось прикрепить файл';
    }
    return text;
  };

  const getFileSizeText = (file: File): string => {
    const fileSize = file.size;
    if (fileSize < 10e5) {
      return `${Math.round(fileSize / 2 ** 10)} КБ`;
    } else {
      return `${Math.round((fileSize / 2 ** 20) * 10) / 10} МБ`;
    }
  };

  const handleFileChange = (file: File) => {
    if (!file) {
      return;
    }

    setFile(undefined);
    const fileType: string | undefined = file.name.split('.').pop();
    if (
      fileType === undefined ||
      (allowedFileTypes & FileType[fileType as keyof typeof FileType]) === 0
    ) {
      setAttachError(true);
      return;
    }

    if (file.size > maxBytesFileSize) {
      setAttachError(true);
      return;
    }

    setLoading(true);
    onFileLoaded(file);
    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
    setFile(file);
    setLoading(false);
  };

  return (
    <div className='h-9 w-full items-center'>
      <label
        htmlFor={inputId}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (e.dataTransfer.files) {
            handleFileChange(e.dataTransfer.files[0]);
          }
        }}
        aria-disabled={isDisabled}
        className={cn(
          'h-9',
          'text-text-secondary',
          'text-sm',
          'py-1.5',
          'px-4',
          'rounded-lg',
          'border-grey-500',
          'border',
          'cursor-pointer',
          'flex',
          'select-none',
          'gap-3',
          'aria-disabled:opacity-50',
          'aria-disabled:cursor-not-allowed',
          'transition',
          isAttachError && ['text-accent-destructive-300', 'border-accent-destructive-400'],
          isDragging && ['text-accent-primary-300', 'border-accent-primary-400'],
          file && ['bg-white bg-opacity-5', 'text-text-primary'],
          !isDisabled && 'hover:bg-grey-600'
        )}
      >
        <Icon
          type={isLoading ? 'loading' : file?.name ? 'archive' : 'attach'}
          className={cn(
            'text-text-secondary',
            { 'text-accent-destructive-300': isAttachError },
            { 'text-accent-primary-300': isDragging }
          )}
        />
        {!file ? getLabelText() : file.name}

        <div className='text-text-secondary ml-auto mr-0 flex gap-4'>
          {file && <span>{getFileSizeText(file)}</span>}
          {(file && (
            <CloseButton
              onClick={(e) => {
                setFile(undefined);
                if (inputRef.current?.value) {
                  inputRef.current.value = '';
                }
                e.preventDefault();
              }}
            />
          )) ||
            (!isAttachError && !isLoading && children)}
        </div>
      </label>
      <input
        name={name}
        id={inputId}
        ref={inputRef}
        onChange={(e) => setFile(e.target.files?.[0])}
        disabled={isDisabled}
        type='file'
        className='hidden'
      />
    </div>
  );
};
