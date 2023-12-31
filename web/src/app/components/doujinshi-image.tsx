import React from 'react';
import Image from 'next/image';
import { useImageSize } from 'react-image-size';
import placeholderImage from '/public/image-placeholder.webp';

interface Props {
  alt?: string;
  src: string;
  priority?: boolean;
}

export default function DoujinshiImage({ alt, src, priority }: Props) {
  priority = priority ?? false;

  const [dimensions, { loading, error }] = useImageSize(src);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {error || !dimensions ? (
        <Image
          className="pointer-events-none w-full h-full object-contain"
          alt="error loading image"
          src={placeholderImage}
          priority={priority}
        />
      ) : (
        <Image
          className="pointer-events-none w-full h-full object-contain"
          alt={alt ?? ''}
          width={dimensions.width}
          height={dimensions.height}
          src={src}
          loading={priority ? 'eager' : 'lazy'}
          placeholder="empty"
          priority={priority}
        />
      )}
    </div>
  );
}
