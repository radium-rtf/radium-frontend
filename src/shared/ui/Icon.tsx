import { ReactNode, SVGProps, forwardRef } from 'react';
import { cn } from '../utils/cn';

export type Icon =
  | 'null'
  | 'attach'
  | 'start'
  | 'question'
  | 'visible'
  | 'invisible'
  | 'picture'
  | 'document'
  | 'archive'
  | 'sound'
  | 'update'
  | 'reset'
  | 'submit'
  | 'send'
  | 'courses'
  | 'profile'
  | 'exit'
  | 'editor'
  | 'group'
  | 'edit'
  | 'table'
  | 'remove'
  | 'checkmark'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'mail'
  | 'password'
  | 'enter'
  | 'loading'
  | 'alert'
  | 'success'
  | 'handle'
  | 'download'
  | 'link'
  | 'external-link'
  | 'add'
  | 'delete'
  | 'bold';

const icons: Record<Icon, ReactNode> = {
  null: null,
  attach: (
    <path
      d='M13.5 4.5V13C13.5 15.4853 11.4853 17.5 9 17.5V17.5C6.51472 17.5 4.5 15.4853 4.5 13V3.5C4.5 1.84315 5.84315 0.5 7.5 0.5V0.5C9.15685 0.5 10.5 1.84315 10.5 3.5V13C10.5 13.8284 9.82843 14.5 9 14.5V14.5C8.17157 14.5 7.5 13.8284 7.5 13V4.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  start: (
    <path
      d='M14 7.26795C15.3333 8.03775 15.3333 9.96225 14 10.7321L6.5 15.0622C5.16666 15.832 3.5 14.8697 3.5 13.3301L3.5 4.66987C3.5 3.13027 5.16667 2.16802 6.5 2.93782L14 7.26795Z'
      className='stroke-current'
      strokeLinejoin='round'
    />
  ),
  question: (
    <>
      <circle cx='9' cy='9' r='8.5' className='stroke-current' />
      <path
        d='M8.10111 13.2979C8.10111 13.0899 8.17044 12.9166 8.30911 12.7779C8.44777 12.6392 8.62111 12.5699 8.82911 12.5699C9.03711 12.5699 9.21044 12.6392 9.34911 12.7779C9.48777 12.9166 9.55711 13.0899 9.55711 13.2979C9.55711 13.5059 9.48777 13.6792 9.34911 13.8179C9.21044 13.9566 9.03711 14.0259 8.82911 14.0259C8.62111 14.0259 8.44777 13.9566 8.30911 13.8179C8.17044 13.6792 8.10111 13.5059 8.10111 13.2979ZM8.32211 11.2699C8.32211 10.8886 8.38277 10.5592 8.50411 10.2819C8.63411 10.0046 8.79444 9.76189 8.98511 9.55389C9.17577 9.33723 9.38377 9.14223 9.60911 8.96889C9.83444 8.79556 10.0424 8.62223 10.2331 8.44889C10.4238 8.26689 10.5798 8.07623 10.7011 7.87689C10.8311 7.67756 10.8961 7.44356 10.8961 7.17489C10.8961 6.75889 10.7314 6.41223 10.4021 6.13489C10.0728 5.84889 9.60911 5.70589 9.01111 5.70589C8.49111 5.70589 8.02744 5.82723 7.62011 6.06989C7.35696 6.22435 7.12592 6.43544 6.92696 6.70317C6.75081 6.94021 6.43095 7.04564 6.1714 6.90474C5.92662 6.77186 5.82453 6.46799 5.97511 6.23368C6.2532 5.80097 6.60653 5.45604 7.03511 5.19889C7.60711 4.86089 8.26577 4.69189 9.01111 4.69189C9.47911 4.69189 9.89511 4.75689 10.2591 4.88689C10.6231 5.01689 10.9308 5.19456 11.1821 5.41989C11.4334 5.64523 11.6241 5.90956 11.7541 6.21289C11.8928 6.51623 11.9621 6.83689 11.9621 7.17489C11.9621 7.53023 11.8971 7.83789 11.7671 8.09789C11.6371 8.34923 11.4724 8.57889 11.2731 8.78689C11.0824 8.99489 10.8744 9.18556 10.6491 9.35889C10.4238 9.53223 10.2114 9.71423 10.0121 9.90489C9.82144 10.0956 9.66111 10.3036 9.53111 10.5289C9.40111 10.7456 9.33611 11.0012 9.33611 11.2959C9.33611 11.5687 9.11494 11.7899 8.84211 11.7899H8.82911C8.5491 11.7899 8.32211 11.5629 8.32211 11.2829V11.2699Z'
        className='fill-current'
      />
    </>
  ),
  visible: (
    <>
      <path
        d='M17.5 9.42106C15.2747 12.4737 12.286 14.3421 9 14.3421C5.71399 14.3421 2.72527 12.4737 0.5 9.42105C2.72527 6.36844 5.71399 4.5 9 4.5C12.286 4.5 15.2747 6.36845 17.5 9.42106Z'
        className='stroke-current'
        strokeLinejoin='round'
      />
      <path
        d='M11 9.5C11 10.6046 10.1046 11.5 9 11.5C7.89543 11.5 7 10.6046 7 9.5C7 8.39543 7.89543 7.5 9 7.5C10.1046 7.5 11 8.39543 11 9.5Z'
        className='stroke-current'
      />
    </>
  ),
  invisible: (
    <path
      d='M17.5 5.00001C16.8876 5.84005 16.2174 6.59041 15.4992 7.23684M0.5 5C1.11237 5.84004 1.78255 6.59041 2.50084 7.23684M6.31579 9.49529C7.18029 9.7741 8.07846 9.92105 9 9.92105C9.92155 9.92105 10.8197 9.7741 11.6842 9.49529M6.31579 9.49529L5.42105 12.6053M6.31579 9.49529C4.94599 9.05351 3.6607 8.28068 2.50084 7.23684M11.6842 9.49529L12.5789 12.6053M11.6842 9.49529C13.054 9.05351 14.3393 8.28068 15.4992 7.23684M15.4992 7.23684L17.5 9.47368M2.50084 7.23684L0.5 9.47368'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  picture: (
    <>
      <rect
        x='0.5'
        y='0.5'
        width='17'
        height='17'
        rx='1.5'
        className='stroke-current'
      />
      <path
        d='M0.5 12.5L4.68867 8.69212C5.43711 8.01172 6.57573 7.99722 7.34125 8.65835L17 17'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='12' cy='6' r='2.5' className='stroke-current' />
    </>
  ),
  document: (
    <path
      d='M15.5 5.5V15.5C15.5 16.6046 14.6046 17.5 13.5 17.5H5.5C4.39543 17.5 3.5 16.6046 3.5 15.5V2.5C3.5 1.39543 4.39543 0.5 5.5 0.5H10.5M15.5 5.5H12.5C11.3954 5.5 10.5 4.60457 10.5 3.5V0.5M15.5 5.5L13 3L10.5 0.5'
      className='stroke-current'
    />
  ),
  archive: (
    <>
      <rect
        x='0.5'
        y='0.5'
        width='17'
        height='17'
        rx='1.5'
        className='stroke-current'
      />
      <path
        d='M8.5 8.5V9.5M8.5 6.5L8.49206 3.32257C8.49074 2.7956 8.2815 2.29045 7.90982 1.9169L7.08639 1.08934C6.71103 0.712092 6.20081 0.5 5.66864 0.5H5.5H11.5H11.3284C10.798 0.5 10.2893 0.710713 9.91421 1.08579L9.08579 1.91421C8.71071 2.28929 8.5 2.79799 8.5 3.32843V6.5Z'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  sound: (
    <>
      <path
        d='M3.5 5.5H2.5C1.39543 5.5 0.5 6.39543 0.5 7.5V10.5C0.5 11.6046 1.39543 12.5 2.5 12.5H3.5L7.08579 16.0858C8.34572 17.3457 10.5 16.4534 10.5 14.6716V3.32843C10.5 1.54662 8.34572 0.654283 7.08579 1.91421L3.5 5.5Z'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 6.17133C14.1254 6.94419 14.5 7.92834 14.5 8.99999C14.5 10.0716 14.1254 11.0558 13.5 11.8287'
        className='stroke-current'
        strokeLinecap='round'
      />
      <path
        d='M13.5 2.36505C15.8789 3.62254 17.5 6.12196 17.5 9C17.5 11.878 15.8789 14.3775 13.5 15.635'
        className='stroke-current'
        strokeLinecap='round'
      />
    </>
  ),
  update: (
    <path
      d='M9 2.49975C13.1421 2.49975 16.5 5.85762 16.5 9.99976C16.5 14.1419 13.1421 17.4998 9 17.4998C4.85786 17.4998 1.5 14.1419 1.5 9.99976C1.5 7.68002 2.55315 5.60626 4.20741 4.23052M9 2.49975L11 6.49976M9 2.49975L13 0.499756'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  reset: (
    <path
      d='M0.5 4.5H12C15.0376 4.5 17.5 6.96243 17.5 10V10C17.5 13.0376 15.0376 15.5 12 15.5H0.5M0.5 4.5L4.5 8.5M0.5 4.5L4.5 0.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  submit: (
    <path
      d='M0.5 10.5L5.5 15.5L17.5 3.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  send: (
    <path
      d='M17.5 9L0.5 0.5V5.80575C0.5 6.78342 1.20683 7.6178 2.1712 7.77853L9.5 9L2.1712 10.2215C1.20683 10.3822 0.5 11.2166 0.5 12.1943V17.5L17.5 9Z'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  courses: (
    <path
      d='M2.5 14.5H11.5C13.7091 14.5 15.5 12.7091 15.5 10.5V10.5M2.5 14.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H13.5C14.6046 17.5 15.5 16.6046 15.5 15.5V15V10.5M2.5 14.5V2.5C2.5 1.39543 3.39543 0.5 4.5 0.5H13.5C14.6046 0.5 15.5 1.39543 15.5 2.5V10.5M5.5 4.5H12.5M5.5 7.5H12.5M5.5 10.5H10.5'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  profile: (
    <>
      <path
        d='M15.5 17.5C16.6046 17.5 17.5253 16.5895 17.2364 15.5233C17.1365 15.1544 17.0085 14.7918 16.853 14.4385C16.4258 13.4679 15.7997 12.586 15.0104 11.8431C14.2211 11.1003 13.2841 10.511 12.2528 10.109C11.2215 9.70693 10.1162 9.5 9 9.5C7.88376 9.5 6.77846 9.70693 5.74719 10.109C4.71592 10.511 3.77889 11.1003 2.98959 11.8431C2.20029 12.586 1.57419 13.4679 1.14702 14.4385C0.991529 14.7918 0.863503 15.1544 0.763553 15.5233C0.474708 16.5895 1.39543 17.5 2.5 17.5L15.5 17.5Z'
        className='stroke-current'
      />
      <circle cx='9' cy='4' r='3.5' className='stroke-current' />
    </>
  ),
  exit: (
    <path
      d='M14.5 2.5V2C14.5 1.17157 13.8284 0.5 13 0.5H5C4.17157 0.5 3.5 1.17157 3.5 2V16C3.5 16.8284 4.17157 17.5 5 17.5H13C13.8284 17.5 14.5 16.8284 14.5 16V14.5M6.5 8.5H17.5M17.5 8.5L14.5 11.5M17.5 8.5L14.5 5.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  editor: (
    <path
      d='M6.5 4.5H2.5C1.39543 4.5 0.5 5.39543 0.5 6.5V11.5C0.5 12.6046 1.39543 13.5 2.5 13.5H6.5M12.5 4.5H15.5C16.6046 4.5 17.5 5.39543 17.5 6.5V11.5C17.5 12.6046 16.6046 13.5 15.5 13.5H12.5M7.5 0.5H9.5M11.5 0.5H9.5M9.5 0.5V17.5M9.5 17.5H7.5M9.5 17.5H11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  group: (
    <>
      <mask id='path-1-inside-1_496_2386' className='fill-current'>
        <path d='M12 18C13.1046 18 14.0276 17.0868 13.7162 16.027C13.3888 14.9125 12.786 13.8865 11.9497 13.0503C10.637 11.7375 8.85652 11 7 11C5.14349 11 3.36301 11.7375 2.05025 13.0503C1.21403 13.8865 0.611227 14.9125 0.28378 16.027C-0.0275743 17.0868 0.895431 18 2 18L7 18H12Z' />
      </mask>
      <path
        d='M12 18C13.1046 18 14.0276 17.0868 13.7162 16.027C13.3888 14.9125 12.786 13.8865 11.9497 13.0503C10.637 11.7375 8.85652 11 7 11C5.14349 11 3.36301 11.7375 2.05025 13.0503C1.21403 13.8865 0.611227 14.9125 0.28378 16.027C-0.0275743 17.0868 0.895431 18 2 18L7 18H12Z'
        className='stroke-current'
        strokeWidth='2'
        mask='url(#path-1-inside-1_496_2386)'
      />
      <circle cx='7' cy='6' r='2.5' className='stroke-current' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.0004 8.99997C12.5915 9.00007 14.1175 9.6322 15.2426 10.7573C15.9594 11.4741 16.4761 12.3535 16.7568 13.3089C16.8041 13.4702 16.769 13.6071 16.6511 13.7361C16.5184 13.8812 16.2833 14 16 14H15.0645C15.2249 14.3228 15.3665 14.6566 15.4879 15H16C17.1046 15 18.0276 14.0868 17.7162 13.027C17.3888 11.9125 16.786 10.8864 15.9497 10.0502C14.7729 8.87335 13.2201 8.15881 11.5736 8.0235C11.4193 8.37171 11.2264 8.69901 11.0004 8.99997Z'
        className='fill-current'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.8569 4.80763C12.5327 4.48668 13 3.79791 13 3C13 1.89543 12.1045 1 11 1C10.4052 1 9.8711 1.25961 9.50475 1.67168C9.20887 1.50009 8.89377 1.35796 8.56348 1.24932C9.10811 0.49267 9.9965 0 11 0C12.6568 0 14 1.34315 14 3C14 4.30727 13.1638 5.41925 11.9971 5.83029C11.9854 5.47902 11.9375 5.13693 11.8569 4.80763Z'
        className='fill-current'
      />
    </>
  ),
  edit: (
    <path
      d='M0.5 11.5V17.5H6.5M0.5 11.5L10.5858 1.41421C11.3668 0.633165 12.6332 0.633165 13.4142 1.41421L16.5858 4.58579C17.3668 5.36683 17.3668 6.63316 16.5858 7.41421L6.5 17.5M0.5 11.5L4.5 13.5L6.5 17.5'
      className='stroke-current'
      strokeLinejoin='round'
    />
  ),
  table: (
    <>
      <rect
        x='0.5'
        y='0.5'
        width='17'
        height='17'
        rx='1.5'
        className='stroke-current'
      />
      <path d='M6.5 0.5V17.5' className='stroke-current' />
      <path d='M0.5 6.5H17.5' className='stroke-current' />
    </>
  ),
  remove: (
    <path
      d='M1 1L17 17M17 1L1 17'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  checkmark: (
    <path
      d='M1 6L3.66667 8.5L6.33333 11L17 1'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'chevron-right': (
    <path
      d='M5.25 0.75L13.5 9L5.25 17.25'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'chevron-left': (
    <path
      d='M13.125 17.25L4.875 9L13.125 0.75'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'chevron-down': (
    <path
      d='M17.25 5.25L9 13.5L0.75 5.25'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  mail: (
    <path
      d='M9 17.5C4.30558 17.5 0.5 13.6944 0.5 9C0.5 4.30558 4.30558 0.5 9 0.5C13.6944 0.5 17.5 4.30558 17.5 9C17.5 10.1046 16.6046 11 15.5 11C14.3954 11 13.5 10.1046 13.5 9M15.0103 15.0104C11.6909 18.3299 6.30896 18.3299 2.9895 15.0104M13.5 9C13.5 11.4853 11.4853 13.5 9 13.5C6.51472 13.5 4.5 11.4853 4.5 9C4.5 6.51472 6.51472 4.5 9 4.5C11.4853 4.5 13.5 6.51472 13.5 9Z'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  password: (
    <g className='text-inherit'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 6H2C1.44772 6 1 6.44772 1 7V11C1 11.5523 1.44772 12 2 12H16C16.5523 12 17 11.5523 17 11V7C17 6.44772 16.5523 6 16 6ZM2 5C0.895431 5 0 5.89543 0 7V11C0 12.1046 0.89543 13 2 13H16C17.1046 13 18 12.1046 18 11V7C18 5.89543 17.1046 5 16 5H2Z'
        className='fill-current'
      />
      <path
        d='M6 9C6 9.55228 5.55228 10 5 10C4.44772 10 4 9.55228 4 9C4 8.44772 4.44772 8 5 8C5.55228 8 6 8.44772 6 9Z'
        className='fill-current'
      />
      <path
        d='M10 9C10 9.55228 9.55229 10 9 10C8.44771 10 8 9.55228 8 9C8 8.44772 8.44771 8 9 8C9.55229 8 10 8.44772 10 9Z'
        className='fill-current'
      />
      <path
        d='M14 9C14 9.55228 13.5523 10 13 10C12.4477 10 12 9.55228 12 9C12 8.44772 12.4477 8 13 8C13.5523 8 14 8.44772 14 9Z'
        className='fill-current'
      />
    </g>
  ),
  enter: (
    <path
      d='M0.5 8.5H11.5M11.5 8.5L8.5 11.5M11.5 8.5L8.5 5.5M3.5 15.5L3.5 16C3.5 16.8284 4.17157 17.5 5 17.5L13 17.5C13.8284 17.5 14.5 16.8284 14.5 16L14.5 2C14.5 1.17157 13.8284 0.500001 13 0.500001L5 0.5C4.17157 0.5 3.5 1.17157 3.5 2L3.5 3.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  loading: (
    <g className='text-inherit'>
      <path
        d='M17.5 9C17.5 4.30558 13.6944 0.5 9 0.5C4.30558 0.5 0.5 4.30558 0.5 9'
        className='stroke-current'
        strokeLinecap='round'
      >
        <animateTransform
          attributeName='transform'
          attributeType='XML'
          type='rotate'
          from='0 9 9'
          to='360 9 9'
          dur='1s'
          repeatCount='indefinite'
        />
      </path>
      <path
        d='M13.5 9C13.5 6.51472 11.4853 4.5 9 4.5C6.51472 4.5 4.5 6.51472 4.5 9'
        className='stroke-current'
        strokeLinecap='round'
      >
        <animateTransform
          attributeName='transform'
          attributeType='XML'
          type='rotate'
          from='360 9 9'
          to='0 9 9'
          dur='1.5s'
          repeatCount='indefinite'
        />
      </path>
      <circle cx='9' cy='9' r='1' className='fill-current' />
    </g>
  ),
  alert: (
    <g className='text-inherit'>
      <path
        d='M9 12.5C9 12.7761 8.77614 13 8.5 13C8.22386 13 8 12.7761 8 12.5C8 12.2239 8.22386 12 8.5 12C8.77614 12 9 12.2239 9 12.5Z'
        className='fill-current'
      />
      <path
        d='M8 4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9 4.22386 9 4.5V10.5C9 10.7761 8.77614 11 8.5 11C8.22386 11 8 10.7761 8 10.5V4.5Z'
        className='fill-current'
      />
      <circle cx='8.5' cy='8.5' r='8' className='stroke-current' />
    </g>
  ),
  success: (
    <path
      d='M0.5 10.5L5.5 15.5L17.5 3.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  handle: (
    <g className='text-inherit'>
      <circle cx='7' cy='5' r='1' className='fill-current' />
      <circle cx='7' cy='9' r='1' className='fill-current' />
      <circle cx='7' cy='13' r='1' className='fill-current' />
      <circle cx='11' cy='13' r='1' className='fill-current' />
      <circle cx='11' cy='9' r='1' className='fill-current' />
      <circle cx='11' cy='5' r='1' className='fill-current' />
    </g>
  ),
  download: (
    <g className='text-inherit'>
      <path
        d='M0.5 12.5V15C0.5 15.8284 1.17157 16.5 2 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V12.5M8.5 1.5V11.5M8.5 11.5L4.5 7.5M8.5 11.5L12.5 7.5'
        stroke='#E6E6E6'
        stroke-linecap='round'
        stroke-linejoin='round'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  ),
  link: (
    <g className='text-inherit'>
      <path
        d='M5.5 8.5H12.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 7C0 5.89543 0.895431 5 2 5H6C7.10457 5 8 5.89543 8 7H7C7 6.44772 6.55228 6 6 6H2C1.44772 6 1 6.44772 1 7V10C1 10.5523 1.44772 11 2 11H6C6.55228 11 7 10.5523 7 10H8C8 11.1046 7.10457 12 6 12H2C0.895431 12 0 11.1046 0 10V7ZM10 10C10 11.1046 10.8954 12 12 12H16C17.1046 12 18 11.1046 18 10V7C18 5.89543 17.1046 5 16 5H12C10.8954 5 10 5.89543 10 7H11C11 6.44772 11.4477 6 12 6H16C16.5523 6 17 6.44772 17 7V10C17 10.5523 16.5523 11 16 11H12C11.4477 11 11 10.5523 11 10H10Z'
        className='fill-current'
      />
    </g>
  ),
  'external-link': (
    <g className='text-inherit'>
      <path
        d='M6.75 0.75H2.25C1.42157 0.75 0.75 1.42157 0.75 2.25V15.75C0.75 16.5784 1.42157 17.25 2.25 17.25H15.75C16.5784 17.25 17.25 16.5784 17.25 15.75V11.25M11.25 0.75H17.25M17.25 0.75V6.75M17.25 0.75L6.75 11.25'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  ),
  add: (
    <g className='text-inherit'>
      <path
        d='M8.5 0.5L8.5 16.5'
        className='stroke-current'
        strokeLinecap='round'
      />
      <path
        d='M0.5 8.5H16.5'
        className='stroke-current'
        strokeLinecap='round'
      />
    </g>
  ),
  delete: (
    <path
      d='M1.5 3.5H6.5M16.5 3.5H11.5M6.5 3.5V2C6.5 1.17157 7.17157 0.5 8 0.5H10C10.8284 0.5 11.5 1.17157 11.5 2V3.5M6.5 3.5H11.5M3.5 3.5V16C3.5 16.8284 4.17157 17.5 5 17.5H13C13.8284 17.5 14.5 16.8284 14.5 16V3.5M6.5 6.5V14.5M11.5 6.5V14.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  bold: (
    <path
      d='M4 8V2.5C4 1.67157 4.67157 1 5.5 1H9C10.933 1 12.5 2.567 12.5 4.5C12.5 6.433 10.933 8 9 8M4 8V15.5C4 16.3284 4.67157 17 5.5 17H9C11.4853 17 13.5 14.9853 13.5 12.5C13.5 10.0147 11.4853 8 9 8M4 8H9'
      className='stroke-current'
      stroke-width='2'
    />
  ),
};
export interface IIcon extends SVGProps<SVGSVGElement> {
  type: Icon;
}

export const Icon = forwardRef<SVGSVGElement, IIcon>(
  ({ className, type }, ref) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={cn('aspect-square h-[1.125rem] text-white', className)}
        viewBox='0 0 18 18'
        fill='none'
        ref={ref}
      >
        {icons[type]}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
