'use client';
import React, { FC } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../../../radium-ui-kit/src/Icon';
import { SmallIcon } from '../../../radium-ui-kit/src/SmallIcon';
import Link, { LinkProps } from 'next/link';
import './index.css';

type DownloadFileProps = Omit<LinkProps, 'type'> & { name: string; sizeInKiB: number };

export const DownloadButton: FC<DownloadFileProps> = ({ name, sizeInKiB, ...props }) => {
  return (
    <Link download className={cn('downloadBtn')} {...props}>
      <div className={cn('downloadBtn__name')}>
        <Icon type='archive' className='text-inherit' />
        {name}
      </div>
      {sizeInKiB?.toFixed(1)} Kb
      <button className='reset downloadBtn__smallicon'>
        <SmallIcon className='text-inherit' type='arrow-down' />
      </button>
    </Link>
  );
};
