import { FC } from 'react';
import { TextSectionResponseDto } from '../model/textSectionResponseDto';
import { Card } from '@/shared';

interface IProps {
  data: TextSectionResponseDto;
}

export const TextSection: FC<IProps> = ({ data }) => {
  return (
    <Card>
      <p className='text-[0.8125rem]'>{data.content}</p>
    </Card>
  );
};
