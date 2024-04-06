'use client';
import {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FileType } from '../types/FileType';
import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { useDrop } from '../hooks/useDrop';
import { SmallIcon } from './SmallIcon';

type InputFileProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  allowedFileTypes?: FileType[];
  fileList?: FileList;
  onFileListChange?: (fileList: FileList | null) => void;
};

export const InputFile: FC<InputFileProps> = ({
  allowedFileTypes,
  disabled,
  onFileListChange,
  fileList = null,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const { isDraggable, ref } = useDrop();
  ref.current = document;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.files = fileList;
      inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, [fileList]);

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    isError && setIsError(false);
    const files = e.target.files;
    if (!files || !files.length) {
      setTitle(null);
    } else {
      const names: string[] = [];
      for (const file of files) {
        if (!allowedFileTypes?.some((type) => type === file.name.split('.')[1])) {
          setIsError(true);
          return;
        }
        names.push(file.name);
      }
      setTitle(names.join(', '));
    }
    onFileListChange?.(files);
  };

  const fileDropHandler: DragEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.dataTransfer;
    if (inputRef.current) {
      inputRef.current.files = files;
      inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <div
      onDrop={fileDropHandler}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex h-9 w-full cursor-pointer items-center justify-stretch gap-2.5 rounded-[0.5rem] border border-white/10 text-[#B3B3B3] transition-colors [&:not(:has(.reset:hover))]:hover:bg-white/10',
        isError && 'border-destructive text-destructive',
        disabled && 'opacity-50',
        isDraggable && 'border-primary text-primary'
      )}
    >
      <div
        className={cn(
          '-m-[1px] flex grow items-center gap-4 self-stretch rounded-[0.5rem] px-4 py-[0.5625rem]',
          title && 'pr-0'
        )}
      >
        <Icon type='attach' className='text-inherit' />
        <p className='grow text-base'>
          {(disabled && 'Прикрепить файл нельзя') ||
            (isDraggable && 'Перетащите файл сюда') ||
            title ||
            'Выберите или перетащите файл'}
        </p>
        {allowedFileTypes && <p>{allowedFileTypes.join(', ')}</p>}
      </div>
      {title && (
        <button
          disabled={disabled}
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            if (inputRef.current) {
              inputRef.current.value = '';
              inputRef.current.files = new DataTransfer().files;
              inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }}
          className='reset mr-2.5 rounded-[0.25rem] p-1.5 transition-colors hover:bg-white/5'
        >
          <SmallIcon className='h-3 w-3 text-inherit' type='remove' />
        </button>
      )}
      <input
        disabled={disabled}
        ref={inputRef}
        onChange={(e) => {
          inputChangeHandler(e);
        }}
        type='file'
        accept={allowedFileTypes ? allowedFileTypes.map((type) => `.${type}`).join() : undefined}
        className='hidden'
        {...props}
      />
    </div>
  );
};
