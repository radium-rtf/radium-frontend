'use client';
import { FC, InputHTMLAttributes, useId, useRef, ChangeEvent, DragEvent } from 'react';
import { FileType } from '../types/FileType';
// import { useDrop } from '../hooks/useDrop';
import { cn } from '../utils/cn';
// import { Icon } from './Icon';
// import { CloseButton } from './CloseButton';

type InputFileProps = InputHTMLAttributes<HTMLInputElement> & {
  allowedFileTypes: FileType[];
  fileList?: FileList;
  onFileListChange?: (fileList: FileList | null) => void;
};

// const getFileSizeText = (file: File): string => {
//   const fileSize = file.size;
//   if (fileSize < 10e5) {
//     return `${Math.round(fileSize / 2 ** 10)} КБ`;
//   } else {
//     return `${Math.round((fileSize / 2 ** 20) * 10) / 10} МБ`;
//   }
// };

export const InputFile: FC<InputFileProps> = ({
  allowedFileTypes,
  className,
  disabled,
  onChange,
  // fileList,
  onFileListChange,
  ...props
}) => {
  // const inputTypes = '.' + allowedFileTypes.map((type) => FileType[type]).join(', .');
  const fileInputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (fileList && inputRef.current) {
  //     inputRef.current.files = fileList;
  //   }
  // }, [fileList]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    onFileListChange?.(files);
  };

  const dropHandler = (e: DragEvent<HTMLLabelElement>) => {
    const files = e.dataTransfer.files;
    onFileListChange?.(files);
  };

  const file = inputRef.current?.files?.item(0);

  return (
    <div className='h-9 w-full items-center'>
      <label
        htmlFor={fileInputId}
        onDrop={dropHandler}
        aria-disabled={disabled}
        className={cn(
          [
            'h-9',
            'text-foreground-secondary',
            'text-sm',
            'py-1.5',
            'px-4',
            'rounded-lg',
            'items-center',
            'font-NTSomic',
            'outline-white',
            'border-white/10',
            'border',
            '-outline-offset-1',
            'cursor-pointer',
            'flex',
            'select-none',
            'text-[0.8125rem]',
            'gap-3',
            'aria-disabled:opacity-50',
            'aria-disabled:cursor-not-allowed',
            'transition',
            // isDragging && ['text-accent-primary-300', 'border-accent-primary-400'],
            // files && ['bg-white bg-opacity-5', 'text-text-primary'],
            !disabled && 'hover:bg-grey-600',
          ],
          className
        )}
      >
        {/* <Icon
          // type={isLoading ? 'loading' : file?.name ? 'archive' : 'attach'}
          type={'attach'}
          className={cn(
            'text-foreground-secondary',
            // { 'text-accent-destructive-300': isAttachError },
            { 'text-accent-primary-300': isDragging }
          )}
        /> */}
        {!file ? 'Прикрепите файл' : file.name}

        {/* <div className='text-foreground-secondary ml-auto mr-0 flex items-center gap-4 '>
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
            (!isAttachError && !isLoading && inputTypes)} */}
        {/* </div> */}
      </label>
      <input
        id={fileInputId}
        ref={inputRef}
        accept={allowedFileTypes.map((type) => FileType[type]).join(', .')}
        // onDrop={(e) => {
        //   e.preventDefault();
        //   const file = e.dataTransfer.files.item(0);
        //   if (file) {
        //     setFile(file);
        //     onDrag?.(e);
        //   }
        // }}
        onChange={(e) => {
          onChange?.(e);
          changeHandler(e);
        }}
        disabled={disabled}
        type='file'
        className='hidden'
        {...props}
      />
    </div>
  );
};
