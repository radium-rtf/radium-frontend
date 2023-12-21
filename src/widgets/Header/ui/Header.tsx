'use client';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { HeaderProfile } from '@/features/HeaderProfile';

interface IProps {
  children?: ReactNode;
}

export const Header: FC<IProps> = ({ children }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const handler = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;

      if (scroll > 50) {
        headerRef.current?.classList.replace('pb-9', 'pb-[0.875rem]');
        headerRef.current?.classList.replace('pt-12', 'pt-[0.875rem]');
        headerRef.current?.classList.add(
          'text-xl',
          '[&>.content_h1]:!text-2xl',
          '[&>.content_img]:h-9',
          '[&>.content_img]:!w-9'
        );
      } else {
        headerRef.current?.classList.replace('pb-[0.875rem]', 'pb-9');
        headerRef.current?.classList.replace('pt-[0.875rem]', 'pt-12');
        headerRef.current?.classList.remove(
          'text-xl',
          '[&>.content_h1]:!text-2xl',
          '[&>.content_img]:h-9',
          '[&>.content_img]:!w-9'
        );
      }
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className='
        fixed
        left-0
        right-0
        top-0
        z-10
        flex
        items-center
        justify-between
        bg-bg-page
        px-12
        pb-9
        pt-12
        transition-all
        [&>.content_*]:transition-all
        [&>.content_img]:transition-all
        '
    >
      <div className='content'>{children}</div>
      <HeaderProfile />
    </header>
  );
};
