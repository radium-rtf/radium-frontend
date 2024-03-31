import Image, { ImageProps } from 'next/image';
import { FC, ReactNode, useEffect, useState } from 'react';

type ImageWithFallbackProps = ImageProps & {
  fallback?: ReactNode;
  fallbackImage?: string;
};

export const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  fallback,
  fallbackImage,
  alt,
  src,
  onError,
  ...props
}) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  if ((isError || !src) && fallback) {
    return fallback;
  }

  return (
    <Image
      alt={alt}
      onError={(e) => {
        setIsError(true);
        onError?.(e);
      }}
      src={isError && fallbackImage ? fallbackImage : src}
      {...props}
    />
  );
};
