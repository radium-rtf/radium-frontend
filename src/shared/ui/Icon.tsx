import { forwardRef, ReactNode, SVGProps } from 'react';
import { cn } from '../utils/cn';

export type Icon =
  | 'blank'
  | 'loading'
  | 'add'
  | 'handle'
  | 'handle-horizontal'
  | 'more'
  | 'menu'
  | 'start'
  | 'alert'
  | 'question'
  | 'visible'
  | 'invisible'
  | 'attach'
  | 'picture'
  | 'video'
  | 'document'
  | 'archive'
  | 'sound'
  | 'update'
  | 'undo'
  | 'redo'
  | 'success'
  | 'send'
  | 'exit'
  | 'enter'
  | 'profile'
  | 'group'
  | 'info'
  | 'editor'
  | 'edit'
  | 'task'
  | 'courses'
  | 'table'
  | 'share'
  | 'download'
  | 'save'
  | 'mail'
  | 'password'
  | 'code'
  | 'language'
  | 'radio'
  | 'checkbox'
  | 'submit'
  | 'arrow-left'
  | 'arrow-right'
  | 'comment'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'underline'
  | 'monospace'
  | 'quote'
  | 'header'
  | 'list'
  | 'link'
  | 'emoji'
  | 'text'
  | 'formula'
  | 'iframe'
  | 'delete'
  | 'shuffle'
  | 'matching'
  | 'object'
  | 'object-brackets'
  | 'keyword'
  | 'timer'
  | 'terminal'
  | 'bug'
  | 'memory'
  | 'label'
  | 'notification'
  | 'notification-dot'
  | 'anchor'
  | 'wand'
  | 'bookmark'
  | 'telegram';

const icons: Record<Icon, ReactNode> = {
  blank: null,
  loading: (
    <>
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
    </>
  ),
  add: (
    <>
      <path d='M9 1L9 17' className='stroke-current' strokeLinecap='round' />
      <path d='M1 9H17' className='stroke-current' strokeLinecap='round' />
    </>
  ),
  handle: (
    <>
      <circle cx='7' cy='5' r='1' className='fill-current' />
      <circle cx='7' cy='9' r='1' className='fill-current' />
      <circle cx='7' cy='13' r='1' className='fill-current' />
      <circle cx='11' cy='13' r='1' className='fill-current' />
      <circle cx='11' cy='9' r='1' className='fill-current' />
      <circle cx='11' cy='5' r='1' className='fill-current' />
    </>
  ),
  'handle-horizontal': (
    <>
      <circle cx='13' cy='7' r='1' className='fill-current' />
      <circle cx='9' cy='7' r='1' className='fill-current' />
      <circle cx='5' cy='7' r='1' className='fill-current' />
      <circle cx='5' cy='11' r='1' className='fill-current' />
      <circle cx='9' cy='11' r='1' className='fill-current' />
      <circle cx='13' cy='11' r='1' className='fill-current' />
    </>
  ),
  more: (
    <>
      <circle cx='13' cy='9' r='1' className='fill-current' />
      <circle cx='9' cy='9' r='1' className='fill-current' />
      <circle cx='5' cy='9' r='1' className='fill-current' />
    </>
  ),
  menu: (
    <path
      d='M0.5 5H17.5M0.5 9H17.5M0.5 13H17.5'
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
  alert: (
    <>
      <path
        d='M9.5 12.5C9.5 12.7761 9.27614 13 9 13C8.72386 13 8.5 12.7761 8.5 12.5C8.5 12.2239 8.72386 12 9 12C9.27614 12 9.5 12.2239 9.5 12.5Z'
        className='fill-current'
      />
      <path
        d='M8.5 4.5C8.5 4.22386 8.72386 4 9 4C9.27614 4 9.5 4.22386 9.5 4.5V10.5C9.5 10.7761 9.27614 11 9 11C8.72386 11 8.5 10.7761 8.5 10.5V4.5Z'
        className='fill-current'
      />
      <circle cx='9' cy='9' r='8.5' className='stroke-current' />
    </>
  ),
  question: (
    <>
      <path
        d='M8.10108 13.2979C8.10108 13.0899 8.17041 12.9166 8.30908 12.7779C8.44775 12.6392 8.62108 12.5699 8.82908 12.5699C9.03708 12.5699 9.21041 12.6392 9.34908 12.7779C9.48775 12.9166 9.55708 13.0899 9.55708 13.2979C9.55708 13.5059 9.48775 13.6792 9.34908 13.8179C9.21041 13.9566 9.03708 14.0259 8.82908 14.0259C8.62108 14.0259 8.44775 13.9566 8.30908 13.8179C8.17041 13.6792 8.10108 13.5059 8.10108 13.2979ZM8.32208 11.2699C8.32208 10.8886 8.38274 10.5592 8.50408 10.2819C8.63408 10.0046 8.79441 9.76189 8.98508 9.55389C9.17575 9.33723 9.38375 9.14223 9.60908 8.96889C9.83441 8.79556 10.0424 8.62223 10.2331 8.44889C10.4237 8.26689 10.5797 8.07623 10.7011 7.87689C10.8311 7.67756 10.8961 7.44356 10.8961 7.17489C10.8961 6.75889 10.7314 6.41223 10.4021 6.13489C10.0727 5.84889 9.60908 5.70589 9.01108 5.70589C8.49108 5.70589 8.02741 5.82723 7.62008 6.06989C7.35693 6.22435 7.12589 6.43544 6.92693 6.70317C6.75078 6.94021 6.43092 7.04564 6.17137 6.90474C5.92659 6.77186 5.8245 6.46799 5.97508 6.23368C6.25317 5.80097 6.6065 5.45604 7.03508 5.19889C7.60708 4.86089 8.26574 4.69189 9.01108 4.69189C9.47908 4.69189 9.89508 4.75689 10.2591 4.88689C10.6231 5.01689 10.9307 5.19456 11.1821 5.41989C11.4334 5.64523 11.6241 5.90956 11.7541 6.21289C11.8927 6.51623 11.9621 6.83689 11.9621 7.17489C11.9621 7.53023 11.8971 7.83789 11.7671 8.09789C11.6371 8.34923 11.4724 8.57889 11.2731 8.78689C11.0824 8.99489 10.8744 9.18556 10.6491 9.35889C10.4237 9.53223 10.2114 9.71423 10.0121 9.90489C9.82141 10.0956 9.66108 10.3036 9.53108 10.5289C9.40108 10.7456 9.33608 11.0012 9.33608 11.2959C9.33608 11.5687 9.11491 11.7899 8.84208 11.7899H8.82908C8.54907 11.7899 8.32208 11.5629 8.32208 11.2829V11.2699Z'
        className='fill-current'
      />
      <circle cx='9' cy='9' r='8.5' className='stroke-current' />
    </>
  ),
  visible: (
    <>
      <path
        d='M17.5 9.42106C15.2747 12.4737 12.286 14.3421 9 14.3421C5.71399 14.3421 2.72527 12.4737 0.5 9.42105C2.72527 6.36844 5.71399 4.5 9 4.5C12.286 4.5 15.2747 6.36845 17.5 9.42106Z'
        className='stroke-current'
        strokeLinejoin='round'
      />
      <circle cx='9' cy='9.5' r='2' className='stroke-current' />
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
  attach: (
    <path
      d='M13.5 4.5V13C13.5 15.4853 11.4853 17.5 9 17.5V17.5C6.51472 17.5 4.5 15.4853 4.5 13V3.5C4.5 1.84315 5.84315 0.5 7.5 0.5V0.5C9.15685 0.5 10.5 1.84315 10.5 3.5V13C10.5 13.8284 9.82843 14.5 9 14.5V14.5C8.17157 14.5 7.5 13.8284 7.5 13V4.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  picture: (
    <>
      <path
        d='M0.5 12.5L4.68867 8.69212C5.43711 8.01172 6.57573 7.99722 7.34125 8.65835L17 17M14.5 6C14.5 7.38071 13.3807 8.5 12 8.5C10.6193 8.5 9.5 7.38071 9.5 6C9.5 4.61929 10.6193 3.5 12 3.5C13.3807 3.5 14.5 4.61929 14.5 6Z'
        className='stroke-current'
        strokeLinecap='round'
      />
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
    </>
  ),
  video: (
    <>
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
      <path
        d='M12.25 7.70096C13.25 8.27831 13.25 9.72169 12.25 10.299L7.75 12.8971C6.75 13.4745 5.5 12.7528 5.5 11.5981L5.5 6.40192C5.5 5.24722 6.75 4.52553 7.75 5.10289L12.25 7.70096Z'
        className='stroke-current'
      />
    </>
  ),
  document: (
    <path
      d='M15 5.5V16C15 16.8284 14.3284 17.5 13.5 17.5H4.5C3.67157 17.5 3 16.8284 3 16V2C3 1.17157 3.67157 0.5 4.5 0.5H10M15 5.5H11.5C10.6716 5.5 10 4.82843 10 4V0.5M15 5.5L12.5 3L10 0.5'
      className='stroke-current'
    />
  ),
  archive: (
    <>
      <path
        d='M8.5 8.5V9.5M5.66863 0.5H5.5M5.66863 0.5H11.3284M5.66863 0.5C6.20081 0.5 6.71103 0.712092 7.08639 1.08933L7.90982 1.9169C8.2815 2.29045 8.49074 2.7956 8.49206 3.32257L8.5 6.5V3.32843C8.5 2.79799 8.71071 2.28929 9.08579 1.91421L9.91421 1.08579C10.2893 0.710713 10.798 0.5 11.3284 0.5M11.3284 0.5H11.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
    </>
  ),
  sound: (
    <path
      d='M13.5 6.17132C14.1254 6.94418 14.5 7.92834 14.5 8.99998C14.5 10.0716 14.1254 11.0558 13.5 11.8287M13.5 2.36503C15.8789 3.62252 17.5 6.12194 17.5 8.99998C17.5 11.878 15.8789 14.3774 13.5 15.6349M2.5 5.49998H3.5L7.08579 1.9142C8.34572 0.654268 10.5 1.5466 10.5 3.32841V14.6716C10.5 16.4534 8.34572 17.3457 7.08579 16.0858L3.5 12.5H2.5C1.39543 12.5 0.5 11.6046 0.5 10.5V7.49998C0.5 6.39542 1.39543 5.49998 2.5 5.49998Z'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  update: (
    <path
      d='M9 2.49975C13.1421 2.49975 16.5 5.85762 16.5 9.99976C16.5 14.1419 13.1421 17.4998 9 17.4998C4.85786 17.4998 1.5 14.1419 1.5 9.99976C1.5 7.68002 2.55315 5.60626 4.20741 4.23052M9 2.49975L11 6.49976M9 2.49975L13 0.499756'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  undo: (
    <path
      d='M0.5 4.5H12C15.0376 4.5 17.5 6.96243 17.5 10V10C17.5 13.0376 15.0376 15.5 12 15.5H0.5M0.5 4.5L4.5 8.5M0.5 4.5L4.5 0.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  redo: (
    <path
      d='M17.5 4.5H6C2.96243 4.5 0.5 6.96243 0.5 10V10C0.5 13.0376 2.96243 15.5 6 15.5H17.5M17.5 4.5L13.5 8.5M17.5 4.5L13.5 0.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  success: (
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
  exit: (
    <path
      d='M14.5 2.5V2C14.5 1.17157 13.8284 0.5 13 0.5H5C4.17157 0.5 3.5 1.17157 3.5 2V16C3.5 16.8284 4.17157 17.5 5 17.5H13C13.8284 17.5 14.5 16.8284 14.5 16V14.5M6.5 8.5H17.5M17.5 8.5L14.5 11.5M17.5 8.5L14.5 5.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  enter: (
    <path
      d='M0.5 8.5H11.5M11.5 8.5L8.5 11.5M11.5 8.5L8.5 5.5M3.5 15.5L3.5 16C3.5 16.8284 4.17157 17.5 5 17.5L13 17.5C13.8284 17.5 14.5 16.8284 14.5 16L14.5 2C14.5 1.17157 13.8284 0.500001 13 0.500001L5 0.5C4.17157 0.5 3.5 1.17157 3.5 2L3.5 3.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  profile: (
    <>
      <path
        d='M15.5 17.5C16.6046 17.5 17.5253 16.5895 17.2365 15.5233C17.1365 15.1544 17.0085 14.7918 16.853 14.4385C16.4258 13.4679 15.7997 12.586 15.0104 11.8431C14.2211 11.1003 13.2841 10.511 12.2528 10.109C11.2216 9.70693 10.1163 9.5 9.00003 9.5C7.8838 9.5 6.77849 9.70693 5.74722 10.109C4.71596 10.511 3.77892 11.1003 2.98963 11.8431C2.20033 12.586 1.57422 13.4679 1.14706 14.4385C0.991563 14.7918 0.863537 15.1544 0.763587 15.5233C0.474742 16.5895 1.39546 17.5 2.50003 17.5H15.5Z'
        className='stroke-current'
      />
      <circle cx='9' cy='4' r='3.5' className='stroke-current' />
    </>
  ),
  group: (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.7567 16.3089C12.476 15.3535 11.9593 14.4741 11.2426 13.7574C10.1174 12.6321 8.59126 12 6.99996 12C5.40866 12 3.88254 12.6321 2.75732 13.7574C2.04058 14.4741 1.52388 15.3535 1.24319 16.3089C1.1958 16.4702 1.23095 16.6072 1.34885 16.7361C1.48151 16.8812 1.71664 17 1.99996 17H12C12.2833 17 12.5184 16.8812 12.6511 16.7361C12.769 16.6072 12.8041 16.4702 12.7567 16.3089ZM13.7162 16.027C14.0275 17.0868 13.1045 18 12 18H1.99996C0.89539 18 -0.0276149 17.0868 0.28374 16.027C0.611187 14.9125 1.21399 13.8865 2.05021 13.0503C3.36297 11.7375 5.14344 11 6.99996 11C8.85648 11 10.637 11.7375 11.9497 13.0503C12.7859 13.8865 13.3887 14.9125 13.7162 16.027Z'
        className='fill-current'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.99996 8C8.10453 8 8.99996 7.10457 8.99996 6C8.99996 4.89543 8.10453 4 6.99996 4C5.89539 4 4.99996 4.89543 4.99996 6C4.99996 7.10457 5.89539 8 6.99996 8ZM6.99996 9C8.65681 9 9.99996 7.65685 9.99996 6C9.99996 4.34315 8.65681 3 6.99996 3C5.34311 3 3.99996 4.34315 3.99996 6C3.99996 7.65685 5.34311 9 6.99996 9Z'
        className='fill-current'
      />
      <path
        d='M11.0003 8.99998C12.5915 9.00008 14.1175 9.63221 15.2426 10.7573C15.9593 11.4741 16.476 12.3535 16.7567 13.3089C16.8041 13.4702 16.769 13.6072 16.6511 13.7361C16.5184 13.8812 16.2833 14 16 14H15.0644C15.2249 14.3228 15.3665 14.6566 15.4878 15H16C17.1045 15 18.0275 14.0868 17.7162 13.027C17.3887 11.9125 16.7859 10.8865 15.9497 10.0502C14.7728 8.87336 13.2201 8.15882 11.5736 8.0235C11.4193 8.37172 11.2264 8.69902 11.0003 8.99998Z'
        className='fill-current'
      />
      <path
        d='M11.8569 4.80763C12.5327 4.48668 13 3.79791 13 3C13 1.89543 12.1045 1 11 1C10.4052 1 9.87109 1.25961 9.50475 1.67168C9.20886 1.50009 8.89377 1.35796 8.56347 1.24932C9.1081 0.49267 9.9965 0 11 0C12.6568 0 14 1.34315 14 3C14 4.30727 13.1638 5.41925 11.9971 5.83029C11.9854 5.47902 11.9375 5.13693 11.8569 4.80763Z'
        className='fill-current'
      />
    </>
  ),
  info: (
    <>
      <path
        d='M9.5 5C9.5 4.72386 9.27614 4.5 9 4.5C8.72386 4.5 8.5 4.72386 8.5 5C8.5 5.27614 8.72386 5.5 9 5.5C9.27614 5.5 9.5 5.27614 9.5 5Z'
        className='fill-current'
      />
      <path
        d='M8.5 13C8.5 13.2761 8.72386 13.5 9 13.5C9.27614 13.5 9.5 13.2761 9.5 13V7C9.5 6.72386 9.27614 6.5 9 6.5C8.72386 6.5 8.5 6.72386 8.5 7V13Z'
        className='fill-current'
      />
      <circle cx='9' cy='9' r='8' className='stroke-current' />
    </>
  ),
  editor: (
    <path
      d='M6.5 4.5H2C1.17157 4.5 0.5 5.17157 0.5 6V12C0.5 12.8284 1.17157 13.5 2 13.5H6.5M12.5 4.5H16C16.8284 4.5 17.5 5.17157 17.5 6V12C17.5 12.8284 16.8284 13.5 16 13.5H12.5M7.5 0.5H9.5M11.5 0.5H9.5M9.5 0.5V17.5M9.5 17.5H7.5M9.5 17.5H11.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  edit: (
    <path
      d='M0.5 11.5V17.5H6.5M0.5 11.5L10.5858 1.41421C11.3668 0.633165 12.6332 0.633165 13.4142 1.41421L16.5858 4.58579C17.3668 5.36683 17.3668 6.63316 16.5858 7.41421L6.5 17.5M0.5 11.5L4.5 13.5L6.5 17.5'
      className='stroke-current'
      strokeLinejoin='round'
    />
  ),
  task: (
    <path
      d='M4.5 4.5H2C1.17157 4.5 0.5 5.17157 0.5 6V16C0.5 16.8284 1.17157 17.5 2 17.5H12C12.8284 17.5 13.5 16.8284 13.5 16V13.5M8.5 13.5L16.9393 5.06066C17.5251 4.47487 17.5251 3.52513 16.9393 2.93934L15.0607 1.06066C14.4749 0.474874 13.5251 0.474874 12.9393 1.06066L4.5 9.5V13.5H8.5Z'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  courses: (
    <>
      <path
        d='M2.5 14.5H11.5C13.7091 14.5 15.5 12.7091 15.5 10.5V10.5M5.5 4.5H12.5M5.5 7.5H12.5M5.5 10.5H10.5'
        className='stroke-current'
        strokeLinecap='round'
      />
      <rect x='2.5' y='0.5' width='13' height='17' rx='1.5' className='stroke-current' />
    </>
  ),
  table: (
    <>
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
      <line x1='6.5' y1='1' x2='6.5' y2='17' className='stroke-current' />
      <line x1='1' y1='6.5' x2='17' y2='6.5' className='stroke-current' />
    </>
  ),
  share: (
    <path
      d='M1 12V14.5C1 15.3284 1.67157 16 2.5 16H15.5C16.3284 16 17 15.3284 17 14.5V12M9 11V1M9 1L5 5M9 1L13 5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  download: (
    <path
      d='M1 12V14.5C1 15.3284 1.67157 16 2.5 16H15.5C16.3284 16 17 15.3284 17 14.5V12M9 1V11M9 11L5 7M9 11L13 7'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  save: (
    <path
      d='M12.5 0.5L17.0607 5.06066C17.342 5.34196 17.5 5.7235 17.5 6.12132V16C17.5 16.8284 16.8284 17.5 16 17.5H14.5M12.5 0.5V5C12.5 5.82843 11.8284 6.5 11 6.5H6C5.17157 6.5 4.5 5.82843 4.5 5V0.5M12.5 0.5H8.5H7.5H4.5M4.5 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V16C0.5 16.8284 1.17157 17.5 2 17.5H3.5M3.5 17.5V13C3.5 12.1716 4.17157 11.5 5 11.5H13C13.8284 11.5 14.5 12.1716 14.5 13V17.5M3.5 17.5H14.5M5.5 14.5H12.5M7.5 4.5V2.5'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  mail: (
    <>
      <path
        d='M9 17.5C4.30558 17.5 0.5 13.6944 0.5 9C0.5 4.30558 4.30558 0.5 9 0.5C13.6944 0.5 17.5 4.30558 17.5 9C17.5 10.1046 16.6046 11 15.5 11C14.3954 11 13.5 10.1046 13.5 9M15.0103 15.0104C11.6909 18.3299 6.30896 18.3299 2.9895 15.0104'
        className='stroke-current'
        strokeLinecap='round'
      />
      <circle cx='9' cy='9' r='4.5' className='stroke-current' />
    </>
  ),
  password: (
    <>
      {' '}
      <rect x='0.5' y='5.5' width='17' height='7' rx='1.5' className='stroke-current' />
      <circle cx='5' cy='9' r='1' className='fill-current' />
      <circle cx='9' cy='9' r='1' className='fill-current' />
      <circle cx='13' cy='9' r='1' className='fill-current' />
    </>
  ),
  code: (
    <path
      d='M8.5 0.5L2.5 17.5M17.5 5.5L2.5 5.5M15.5 0.5L9.5 17.5M15.5 12.5L0.5 12.5'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  language: (
    <path
      d='M4.5 5L1.56066 7.93934C0.974874 8.52513 0.974874 9.47487 1.56066 10.0607L4.5 13M13.5 5L16.4393 7.93934C17.0251 8.52513 17.0251 9.47487 16.4393 10.0607L13.5 13M11.5 2.5L6.5 15.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  radio: (
    <>
      <circle cx='9' cy='9' r='8.5' className='stroke-current' />
      <circle cx='9' cy='9' r='4.5' className='stroke-current' />
    </>
  ),
  checkbox: (
    <>
      <path
        d='M13.5 6L7.5 12L4.5 9'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
    </>
  ),
  submit: (
    <>
      <path
        d='M13.5 6L7.5 12L4.5 9'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='9' cy='9' r='8.5' className='stroke-current' />
    </>
  ),
  'arrow-left': (
    <path
      d='M17.5 8.5H0.5M0.5 8.5L6.5 14.5M0.5 8.5L6.5 2.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  'arrow-right': (
    <path
      d='M0.5 8.5H17.5M17.5 8.5L11.5 14.5M17.5 8.5L11.5 2.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  comment: (
    <path
      d='M16 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V11C0.5 11.8284 1.17157 12.5 2 12.5H6.87868C7.2765 12.5 7.65803 12.658 7.93934 12.9393L12.5 17.5V14C12.5 13.1716 13.1716 12.5 14 12.5H16C16.8284 12.5 17.5 11.8284 17.5 11V2C17.5 1.17157 16.8284 0.5 16 0.5Z'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  bold: (
    <path
      d='M4 8V2.5C4 1.67157 4.67157 1 5.5 1H9C10.933 1 12.5 2.567 12.5 4.5C12.5 6.433 10.933 8 9 8M4 8V15.5C4 16.3284 4.67157 17 5.5 17H9C11.4853 17 13.5 14.9853 13.5 12.5C13.5 10.0147 11.4853 8 9 8M4 8H9'
      className='stroke-current'
      strokeWidth='2'
    />
  ),
  italic: (
    <>
      <path
        d='M7.5 0.5H11H14.5M3.5 17.5H7H10.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 0.5V0.5C12.2423 0.5 10.7155 1.70924 10.3129 3.42025L7.68712 14.5797C7.28453 16.2908 5.75774 17.5 4 17.5V17.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  strikethrough: (
    <>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 5C4 3.067 5.567 1.5 7.5 1.5H12.5C12.7761 1.5 13 1.27614 13 1C13 0.723858 12.7761 0.5 12.5 0.5H7.5C5.01472 0.5 3 2.51472 3 5C3 5.52595 3.09023 6.03083 3.25606 6.5H4.33682C4.12085 6.04537 4 5.5368 4 5ZM14.7439 11.5H13.6632C13.8792 11.9546 14 12.4632 14 13C14 14.933 12.433 16.5 10.5 16.5H5.5C5.22386 16.5 5 16.7239 5 17C5 17.2761 5.22386 17.5 5.5 17.5H10.5C12.9853 17.5 15 15.4853 15 13C15 12.474 14.9098 11.9692 14.7439 11.5Z'
        className='fill-current'
      />
      <path
        d='M0.5 9H17.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  underline: (
    <path
      d='M3.5 0.5V9C3.5 12.0376 5.96243 14.5 9 14.5C12.0376 14.5 14.5 12.0376 14.5 9V0.5M3.5 17.5H14.5'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  monospace: (
    <path
      d='M3.5 17.5V0.5L7.99099 4.58272C8.56312 5.10284 9.43688 5.10284 10.009 4.58272L14.5 0.5V17.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  quote: (
    <>
      <path
        d='M4.5 12.5C6.15685 12.5 7.5 11.1569 7.5 9.5C7.5 7.84315 6.15685 6.5 4.5 6.5V4.5C2.29086 4.5 0.5 6.29086 0.5 8.5C0.5 10.7091 2.29086 12.5 4.5 12.5Z'
        className='stroke-current'
        strokeLinejoin='round'
      />
      <path
        d='M14.5 12.5C16.1569 12.5 17.5 11.1569 17.5 9.5C17.5 7.84315 16.1569 6.5 14.5 6.5V4.5C12.2909 4.5 10.5 6.29086 10.5 8.5C10.5 10.7091 12.2909 12.5 14.5 12.5Z'
        className='stroke-current'
        strokeLinejoin='round'
      />
    </>
  ),
  header: (
    <path
      d='M4.5 0.5V8.5M4.5 17.5V8.5M4.5 8.5H13.5M13.5 0.5V17.5M2.5 0.5H6.5M11.5 0.5H15.5M11.5 17.5H15.5M2.5 17.5H6.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  list: (
    <>
      <circle cx='2.5' cy='5.5' r='2' className='stroke-current' />
      <circle cx='2.5' cy='12.5' r='2' className='stroke-current' />
      <path d='M7.5 5.5H17.5' className='stroke-current' strokeLinecap='round' />
      <path d='M7.5 12.5H17.5' className='stroke-current' strokeLinecap='round' />
    </>
  ),
  link: (
    <>
      <path
        d='M5.5 9H12.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 7.5C0 6.39543 0.895431 5.5 2 5.5H6C7.10457 5.5 8 6.39543 8 7.5H7C7 6.94772 6.55228 6.5 6 6.5H2C1.44772 6.5 1 6.94772 1 7.5V10.5C1 11.0523 1.44772 11.5 2 11.5H6C6.55228 11.5 7 11.0523 7 10.5H8C8 11.6046 7.10457 12.5 6 12.5H2C0.895431 12.5 0 11.6046 0 10.5V7.5ZM10 10.5C10 11.6046 10.8954 12.5 12 12.5H16C17.1046 12.5 18 11.6046 18 10.5V7.5C18 6.39543 17.1046 5.5 16 5.5H12C10.8954 5.5 10 6.39543 10 7.5H11C11 6.94772 11.4477 6.5 12 6.5H16C16.5523 6.5 17 6.94772 17 7.5V10.5C17 11.0523 16.5523 11.5 16 11.5H12C11.4477 11.5 11 11.0523 11 10.5H10Z'
        className='fill-current'
      />
    </>
  ),
  emoji: (
    <>
      {' '}
      <circle cx='9' cy='9' r='8.5' className='stroke-current' />
      <circle cx='6' cy='7' r='1' className='fill-current' />
      <circle cx='12' cy='7' r='1' className='fill-current' />
      <path
        d='M5.83679 11.5C6.39852 12.6825 7.60378 13.5 8.99998 13.5C10.3962 13.5 11.6014 12.6825 12.1632 11.5'
        className='stroke-current'
        strokeLinecap='round'
      />
    </>
  ),
  text: (
    <path
      d='M9 17.5V0.5M9 17.5H6M9 17.5H12M9 0.5H3V3.5M9 0.5H15V3.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  formula: (
    <path
      d='M8.5 0.5V0.5C6.29086 0.5 4.5 2.29086 4.5 4.5V13.5C4.5 15.7091 2.70914 17.5 0.5 17.5V17.5M7.5 7.5H2.5M9.5 8.5V8.5C8.22671 11.3649 8.22671 14.6351 9.5 17.5V17.5M16.5 8.5V8.5C17.7733 11.3649 17.7733 14.6351 16.5 17.5V17.5M11.5 10.5L14.5 15.5M14.5 10.5L11.5 15.5'
      className='stroke-current'
      strokeLinecap='round'
    />
  ),
  iframe: (
    <>
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
      <path
        d='M6.5 5L3.56066 7.93934C2.97487 8.52513 2.97487 9.47487 3.56066 10.0607L6.5 13M11.5 5L14.4393 7.93934C15.0251 8.52513 15.0251 9.47487 14.4393 10.0607L11.5 13'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  delete: (
    <path
      d='M1.5 3.5H6.5M16.5 3.5H11.5M6.5 3.5V2C6.5 1.17157 7.17157 0.5 8 0.5H10C10.8284 0.5 11.5 1.17157 11.5 2V3.5M6.5 3.5H11.5M3.5 3.5V16C3.5 16.8284 4.17157 17.5 5 17.5H13C13.8284 17.5 14.5 16.8284 14.5 16V3.5M6.5 6.5V14.5M11.5 6.5V14.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  shuffle: (
    <>
      <rect x='8.5' y='0.5' width='9' height='7' rx='1.5' className='stroke-current' />
      <rect x='8.5' y='10.5' width='9' height='7' rx='1.5' className='stroke-current' />
      <path
        d='M5.5 3.5H3C1.61929 3.5 0.5 4.61929 0.5 6V12C0.5 13.3807 1.61929 14.5 3 14.5H5.5M5.5 3.5L3.5 5.5M5.5 3.5L3.5 1.5M5.5 14.5L3.5 16.5M5.5 14.5L3.5 12.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  matching: (
    <>
      <rect x='0.5' y='0.5' width='6' height='7' rx='1.5' className='stroke-current' />
      <rect x='0.5' y='10.5' width='6' height='7' rx='1.5' className='stroke-current' />
      <path
        d='M6.5 13.5V13.5C7.60457 13.5 8.5 12.6046 8.5 11.5V7C8.5 5.61929 9.61929 4.5 11 4.5H11.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='11.5' y='0.5' width='6' height='7' rx='1.5' className='stroke-current' />
      <rect x='11.5' y='10.5' width='6' height='7' rx='1.5' className='stroke-current' />
    </>
  ),
  object: (
    <path
      d='M1 4.5L8.10557 0.947214C8.66863 0.665686 9.33137 0.665686 9.89443 0.947214L17 4.5M1 4.5L9 8.5M1 4.5V12.2639C1 13.0215 1.428 13.714 2.10557 14.0528L9 17.5M17 4.5L9 8.5M17 4.5V12.2639C17 13.0215 16.572 13.714 15.8944 14.0528L9 17.5M9 8.5V17.5'
      className='stroke-current'
      strokeLinejoin='round'
    />
  ),
  'object-brackets': (
    <path
      d='M3 5.5L8.10557 2.94721C8.66863 2.66569 9.33137 2.66569 9.89443 2.94721L15 5.5M3 5.5L9 8.5M3 5.5V11.2639C3 12.0215 3.428 12.714 4.10557 13.0528L9 15.5M15 5.5L9 8.5M15 5.5V11.2639C15 12.0215 14.572 12.714 13.8944 13.0528L9 15.5M9 8.5V15.5M3.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V15.5C0.5 16.6046 1.39543 17.5 2.5 17.5H3.5M14.5 0.5H15.5C16.6046 0.5 17.5 1.39543 17.5 2.5V15.5C17.5 16.6046 16.6046 17.5 15.5 17.5H14.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  keyword: (
    <>
      <rect x='0.5' y='1.5' width='8' height='3' rx='1.5' className='stroke-current' />
      <rect
        x='11.25'
        y='3.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
      <rect
        x='0.25'
        y='8.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
      <rect
        x='9.25'
        y='8.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
      <rect
        x='2.25'
        y='12.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
      <rect
        x='11.25'
        y='12.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
      <rect
        x='5.25'
        y='16.25'
        width='6.5'
        height='0.5'
        rx='0.25'
        className='stroke-current'
        strokeWidth='0.5'
      />
    </>
  ),
  timer: (
    <>
      <circle cx='9' cy='9' r='8' className='stroke-current' />
      <path d='M9 4V9H14' className='stroke-current' strokeLinecap='round' strokeLinejoin='round' />
    </>
  ),
  terminal: (
    <>
      <rect x='0.5' y='0.5' width='17' height='17' rx='1.5' className='stroke-current' />
      <path
        d='M3.5 3.5L6.5 6.5L3.5 9.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 9.5H11.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  bug: (
    <>
      <rect x='4.5' y='2.5' width='9' height='13' rx='4.5' className='stroke-current' />
      <path
        d='M4.5 6.5V6.5C2.29086 6.5 0.5 4.70914 0.5 2.5V0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 6.5V6.5C15.7091 6.5 17.5 4.70914 17.5 2.5V0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.5 9.5H0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 9.5H17.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.5 12.5V12.5C2.29086 12.5 0.5 14.2909 0.5 16.5V17.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 12.5V12.5C15.7091 12.5 17.5 14.2909 17.5 16.5V17.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  memory: (
    <>
      <rect x='0.5' y='4.5' width='17' height='9' rx='1.5' className='stroke-current' />
      <path
        d='M4.5 4.5V0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.5 17.5V13.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 4.5V0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 17.5V13.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.5 4.5V0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.5 17.5V13.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 4.5V0.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 17.5V13.5'
        className='stroke-current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  label: (
    <>
      <path
        d='M5.91421 3.58579L0.5 9L5.91421 14.4142C6.28929 14.7893 6.79799 15 7.32843 15H15.5C16.6046 15 17.5 14.1046 17.5 13V5C17.5 3.89543 16.6046 3 15.5 3H7.32843C6.79799 3 6.28929 3.21071 5.91421 3.58579Z'
        className='stroke-current'
        strokeLinejoin='round'
      />
      <circle cx='7.5' cy='9' r='2' className='stroke-current' />
    </>
  ),
  notification: (
    <>
      <path
        d='M9.00005 2.5C9.55234 2.5 10.0001 2.05228 10.0001 1.5C10.0001 0.947715 9.55234 0.5 9.00005 0.5C8.44777 0.5 8.00005 0.947715 8.00005 1.5C8.00005 2.05228 8.44777 2.5 9.00005 2.5Z'
        className='fill-current'
      />
      <path
        d='M9.00005 2.5C9.55234 2.5 10.0001 2.05228 10.0001 1.5C10.0001 0.947715 9.55234 0.5 9.00005 0.5C8.44777 0.5 8.00005 0.947715 8.00005 1.5C8.00005 2.05228 8.44777 2.5 9.00005 2.5ZM9.00005 2.5C6.51477 2.5 4.49938 4.51469 4.49938 6.99997L4.50049 12.5C4.50049 13.6046 3.60506 14.5 2.50049 14.5H15.5001C14.3955 14.5 13.5001 13.6046 13.5001 12.5L13.4994 6.99997C13.4994 4.51469 11.4853 2.5 9.00005 2.5ZM11.5 15C11.5 16.3807 10.3807 17.5 9 17.5C7.61929 17.5 6.5 16.3807 6.5 15'
        className='stroke-current'
        strokeLinejoin='round'
      />
    </>
  ),
  'notification-dot': (
    <>
      <path
        d='M9.00005 2.5C9.55234 2.5 10.0001 2.05228 10.0001 1.5C10.0001 0.947715 9.55234 0.5 9.00005 0.5C8.44777 0.5 8.00005 0.947715 8.00005 1.5C8.00005 2.05228 8.44777 2.5 9.00005 2.5Z'
        className='fill-current'
      />
      <path
        d='M4.49938 6.99997H3.99938V7.00007L4.49938 6.99997ZM14 8.49999C14 8.22385 13.7761 8 13.5 8C13.2238 8 13 8.22387 13 8.50001L14 8.49999ZM4.50049 12.5H5.00049V12.4999L4.50049 12.5ZM2.50049 14C2.22435 14 2.00049 14.2239 2.00049 14.5C2.00049 14.7761 2.22435 15 2.50049 15V14ZM13.5001 12.5H14.0001V12.5L13.5001 12.5ZM15.5001 15C15.7762 15 16.0001 14.7761 16.0001 14.5C16.0001 14.2239 15.7762 14 15.5001 14V15ZM9.50005 1.5C9.50005 1.77614 9.2762 2 9.00005 2V3C9.82848 3 10.5001 2.32843 10.5001 1.5H9.50005ZM9.00005 2C8.72391 2 8.50005 1.77614 8.50005 1.5H7.50005C7.50005 2.32843 8.17163 3 9.00005 3V2ZM8.50005 1.5C8.50005 1.22386 8.72391 1 9.00005 1V0C8.17163 0 7.50005 0.671573 7.50005 1.5H8.50005ZM9.00005 1C9.2762 1 9.50005 1.22386 9.50005 1.5H10.5001C10.5001 0.671573 9.82848 0 9.00005 0V1ZM4.99938 6.99997C4.99938 4.79094 6.79081 3 9.00005 3V2C6.23873 2 3.99938 4.23845 3.99938 6.99997H4.99938ZM4.00049 12.5C4.00049 13.3284 3.32892 14 2.50049 14V15C3.8812 15 5.00049 13.8807 5.00049 12.5H4.00049ZM3.99938 7.00007L4.00049 12.5001L5.00049 12.4999L4.99938 6.99987L3.99938 7.00007ZM13 8.50001L13.0001 12.5L14.0001 12.5L14 8.49999L13 8.50001ZM11 15C11 16.1046 10.1046 17 9 17V18C10.6569 18 12 16.6569 12 15H11ZM9 17C7.89543 17 7 16.1046 7 15H6C6 16.6569 7.34315 18 9 18V17ZM13.0001 12.5C13.0001 13.8807 14.1194 15 15.5001 15V14C14.6716 14 14.0001 13.3284 14.0001 12.5H13.0001ZM2.50049 15H15.5001V14H2.50049V15Z'
        className='fill-current'
      />
      <circle cx='14' cy='4' r='3' fill='#F29191' />
    </>
  ),
  anchor: (
    <path
      d='M9.05845 4.5C10.163 4.5 11.0584 3.60457 11.0584 2.5C11.0584 1.39543 10.163 0.5 9.05845 0.5C7.95388 0.5 7.05845 1.39543 7.05845 2.5C7.05845 3.60457 7.95388 4.5 9.05845 4.5ZM9.05845 4.5L9.05849 17.5M6.05849 7.5H12.0585M3.3999 12.5C4.22358 14.8304 6.44605 16.5 9.05849 16.5C11.6709 16.5 13.8934 14.8304 14.7171 12.5'
      className='stroke-current'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  wand: (
    <>
      <path
        d='M11.5 4.5L14.5 1.5C15.0523 0.947715 15.9477 0.947715 16.5 1.5V1.5C17.0523 2.05228 17.0523 2.94771 16.5 3.5L13.5 6.5M11.5 4.5L1.5 14.5C0.947716 15.0523 0.947715 15.9477 1.5 16.5V16.5C2.05228 17.0523 2.94772 17.0523 3.5 16.5L13.5 6.5M11.5 4.5L13.5 6.5'
        className='stroke-current'
      />
      <path
        d='M2.79814 1.90372L3.5 0.5L4.20186 1.90372C4.39539 2.29077 4.70923 2.60461 5.09628 2.79814L6.5 3.5L5.09628 4.20186C4.70923 4.39539 4.39539 4.70923 4.20186 5.09628L3.5 6.5L2.79814 5.09628C2.60461 4.70923 2.29077 4.39539 1.90372 4.20186L0.5 3.5L1.90372 2.79814C2.29077 2.60461 2.60461 2.29077 2.79814 1.90372Z'
        className='stroke-current'
        strokeLinejoin='round'
      />
      <circle cx='8' cy='1' r='1' className='fill-current' />
      <circle cx='1' cy='10' r='1' className='fill-current' />
    </>
  ),
  bookmark: (
    <path
      d='M13.5001 0.5H4.5C3.39543 0.5 2.5 1.39543 2.5 2.5V17.5L7.70812 13.0931C8.45381 12.4622 9.54619 12.4622 10.2919 13.0931L15.5001 17.5V2.5C15.5001 1.39543 14.6046 0.5 13.5001 0.5Z'
      className='stroke-current'
      strokeLinejoin='round'
    />
  ),
  telegram: (
    <path
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM9.32249 6.6442C8.44711 7.0083 6.69757 7.7619 4.07389 8.905C3.64784 9.07442 3.42466 9.24017 3.40435 9.40223C3.37001 9.67613 3.71301 9.78398 4.18008 9.93085C4.24361 9.95082 4.30944 9.97152 4.37692 9.99346C4.83645 10.1428 5.45459 10.3176 5.77594 10.3245C6.06743 10.3308 6.39277 10.2107 6.75195 9.96401C9.20334 8.30925 10.4688 7.47286 10.5482 7.45483C10.6042 7.44211 10.6819 7.42611 10.7345 7.47289C10.7872 7.51966 10.782 7.60824 10.7764 7.63201C10.7424 7.77686 9.39606 9.02858 8.69931 9.67634C8.4821 9.87828 8.32802 10.0215 8.29653 10.0542C8.22597 10.1275 8.15406 10.1968 8.08495 10.2635C7.65804 10.675 7.3379 10.9836 8.10268 11.4876C8.47019 11.7298 8.76428 11.9301 9.05768 12.1299C9.37809 12.3481 9.69768 12.5657 10.1112 12.8368C10.2165 12.9058 10.3171 12.9775 10.4151 13.0474C10.788 13.3132 11.123 13.5521 11.5369 13.514C11.7774 13.4919 12.0258 13.2657 12.152 12.5913C12.4501 10.9974 13.0362 7.54384 13.1716 6.12073C13.1835 5.99605 13.1686 5.83648 13.1566 5.76643C13.1446 5.69638 13.1195 5.59658 13.0285 5.5227C12.9207 5.4352 12.7542 5.41675 12.6797 5.41806C12.3412 5.42403 11.8219 5.60461 9.32249 6.6442Z'
      className='fill-current'
    />
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  type: Icon;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ className, type, ...props }, ref) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-[1.125rem] w-[1.125rem] text-white', className)}
      viewBox='0 0 18 18'
      fill='none'
      ref={ref}
      {...props}
    >
      {icons[type]}
    </svg>
  );
});

Icon.displayName = 'Icon';
