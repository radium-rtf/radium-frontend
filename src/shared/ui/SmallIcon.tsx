import { FC, ReactNode, SVGProps } from 'react';
import { cn } from '../utils/cn';

export type SmallIcon =
  | 'blank'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'remove'
  | 'handle'
  | 'arrow-down'
  | 'arrow-up'
  | 'add'
  | 'external-link'
  | 'edit'
  | 'done'
  | 'visible'
  | 'invisible'
  | 'object'
  | 'object-in-brackets'
  | 'keyword'
  | 'timer';

type SmallIconProps = SVGProps<SVGSVGElement> & {
  type: SmallIcon;
};

const smallIcons: Record<SmallIcon, ReactNode> = {
  blank: null,
  'chevron-up': (
    <path
      d='M11.5 8.5L6 3L0.5 8.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'chevron-right': (
    <path
      d='M3.5 0.5L9 6L3.5 11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'chevron-down': (
    <path
      d='M11.5 3.5L6 9L0.5 3.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'chevron-left': (
    <path
      d='M8.5 11.5L3 6L8.5 0.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  remove: (
    <path
      d='M0.5 0.5L11.5 11.5M11.5 0.5L0.5 11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  handle: (
    <g>
      <path
        d='M5 2C5 2.55228 4.55228 3 4 3C3.44772 3 3 2.55228 3 2C3 1.44772 3.44772 1 4 1C4.55228 1 5 1.44772 5 2Z'
        className='fill-current'
      />
      <path
        d='M5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6Z'
        className='fill-current'
      />
      <path
        d='M5 10C5 10.5523 4.55228 11 4 11C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9C4.55228 9 5 9.44772 5 10Z'
        className='fill-current'
      />
      <path
        d='M9 2C9 2.55228 8.55228 3 8 3C7.44772 3 7 2.55228 7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2Z'
        className='fill-current'
      />
      <path
        d='M9 6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6Z'
        className='fill-current'
      />
      <path
        d='M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z'
        className='fill-current'
      />
    </g>
  ),
  'arrow-down': (
    <path
      d='M10.5 6.5L5.5 11.5M5.5 11.5L0.5 6.5M5.5 11.5L5.5 0.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'arrow-up': (
    <path
      d='M0.5 5.5L5.5 0.5M5.5 0.5L10.5 5.5M5.5 0.5L5.5 11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  add: (
    <>
      <path d='M0.5 5.5H10.5' className='stroke-current' strokeLinecap='round' />
      <path d='M5.5 10.5L5.5 0.5' className='stroke-current' strokeLinecap='round' />
    </>
  ),
  'external-link': (
    <path
      d='M4.5 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V10C0.5 10.8284 1.17157 11.5 2 11.5H10C10.8284 11.5 11.5 10.8284 11.5 10V7.5M7.5 0.5H11.5M11.5 0.5V4.5M11.5 0.5L4.5 7.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  edit: (
    <path
      d='M0.5 7.5V11.5H4.5M0.5 7.5L6.93934 1.06066C7.52513 0.474874 8.47487 0.474874 9.06066 1.06066L10.9393 2.93934C11.5251 3.52513 11.5251 4.47487 10.9393 5.06066L4.5 11.5M0.5 7.5L2.78849 8.26283C3.23639 8.41213 3.58787 8.76361 3.73717 9.21151L4.5 11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  done: (
    <path
      d='M0.5 7.5L3.5 10.5L11.5 2.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  visible: (
    <>
      <path
        xmlns='http://www.w3.org/2000/svg'
        d='M11.5 6L11.8933 6.30876C12.0356 6.12751 12.0356 5.87249 11.8933 5.69125L11.5 6ZM0.5 6L0.106717 5.69125C-0.0355725 5.87249 -0.0355725 6.12751 0.106717 6.30875L0.5 6ZM11.1067 5.69125C9.70899 7.47164 7.91665 8.5 6 8.5V9.5C8.30091 9.5 10.3594 8.26254 11.8933 6.30876L11.1067 5.69125ZM6 8.5C4.08335 8.5 2.29102 7.47164 0.893283 5.69125L0.106717 6.30875C1.64057 8.26254 3.6991 9.5 6 9.5V8.5ZM0.893283 6.30875C2.29102 4.52836 4.08335 3.5 6 3.5V2.5C3.6991 2.5 1.64057 3.73746 0.106717 5.69125L0.893283 6.30875ZM6 3.5C7.91665 3.5 9.70898 4.52836 11.1067 6.30876L11.8933 5.69125C10.3594 3.73747 8.30091 2.5 6 2.5V3.5Z'
        className='fill-current'
      />
      <circle xmlns='http://www.w3.org/2000/svg' cx='6' cy='6' r='1' className='fill-current' />
    </>
  ),
  invisible: (
    <path
      d='M11.5 3.5C11.0457 4.07873 10.5471 4.58693 10.0127 5.01271M0.5 3.5C0.954345 4.07873 1.45285 4.58693 1.98729 5.01271M0.5 6.5L1.98729 5.01271M3.5 8L3.96546 6.13818M8.5 8L8.03454 6.13818M11.5 6.5L10.0127 5.01271M1.98729 5.01271C2.60316 5.50336 3.26674 5.88458 3.96546 6.13818M3.96546 6.13818C4.61653 6.37449 5.29811 6.5 6 6.5C6.70189 6.5 7.38347 6.37449 8.03454 6.13818M8.03454 6.13818C8.73326 5.88458 9.39684 5.50336 10.0127 5.01271'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  object: (
    <path
      d='M1 3L5.10557 0.947214C5.66863 0.665686 6.33137 0.665686 6.89443 0.947214L11 3M1 3L6 5.5M1 3V7.76393C1 8.52148 1.42801 9.214 2.10557 9.55279L6 11.5M11 3L6 5.5M11 3V7.76393C11 8.52148 10.572 9.214 9.89443 9.55279L6 11.5M6 5.5V11.5'
      className='stroke-current'
      strokeLinejoin='round'
    />
  ),
  'object-in-brackets': (
    <path
      d='M3 4L5.10557 2.94721C5.66863 2.66569 6.33137 2.66569 6.89443 2.94721L9 4M3 4L6 5.5M3 4V6.76393C3 7.52148 3.428 8.214 4.10557 8.55279L6 9.5M9 4L6 5.5M9 4V6.76393C9 7.52148 8.572 8.214 7.89443 8.55279L6 9.5M6 5.5V9.5M2.5 0.5V0.5C1.39543 0.5 0.5 1.39543 0.5 2.5V9.5C0.5 10.6046 1.39543 11.5 2.5 11.5V11.5M9.5 0.5V0.5C10.6046 0.5 11.5 1.39543 11.5 2.5V9.5C11.5 10.6046 10.6046 11.5 9.5 11.5V11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  keyword: (
    <>
      <rect x='0.5' y='4.5' width='11' height='3' rx='1.5' className='stroke-current' />
      <rect
        x='2.25'
        y='1.25'
        width='7.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
      <rect
        x='2.25'
        y='10.25'
        width='7.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
    </>
  ),
  timer: (
    <>
      <circle cx='6' cy='6' r='5.5' className='stroke-current' />
      <path d='M5 4V7H8' className='stroke-current' strokeLinecap='round' strokeLinejoin='round' />
    </>
  ),
};

export const SmallIcon: FC<SmallIconProps> = ({ type, className, ...props }) => {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-3 w-3 text-white', className)}
      {...props}
    >
      {smallIcons[type]}
    </svg>
  );
};
