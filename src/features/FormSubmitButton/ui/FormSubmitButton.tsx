import { Button, Icon } from '@/shared';
import { FC } from 'react';

interface IProps {
  isLoading: boolean;
  error?: string;
  defaultIcon: Icon;
  text: string;
}

export const FormSubmitButton: FC<IProps> = ({ isLoading, error, defaultIcon, text }) => {
  return (
    <Button disabled={isLoading} type='submit' color={error ? 'destructive' : 'accent'}>
      <Icon
        className='shrink-0 text-inherit'
        type={isLoading ? 'loading' : error ? 'alert' : defaultIcon}
      />
      <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
        {isLoading ? 'Загружаем...' : error || text}
      </span>
    </Button>
  );
};
