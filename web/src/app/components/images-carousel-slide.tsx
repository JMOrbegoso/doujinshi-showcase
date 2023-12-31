import React, { useState } from 'react';
import { DoujinshiImage, ErrorCallingApi, LoadingSpinnerPage, NoContent } from '@/app/components';
import { Slide } from 'pure-react-carousel';
import { useImageSize } from 'react-image-size';

import 'pure-react-carousel/dist/react-carousel.es.css';

interface Props {
  imageIndex: number;
  imageSrc: string;
}

export default function ImagesCarouselSlide({ imageIndex, imageSrc }: Props) {
  const [dimensions, { loading, error }] = useImageSize(imageSrc);
  const [scale, setScale] = useState<number>(1);

  if (loading) {
    return <LoadingSpinnerPage />;
  }

  if (error) {
    return <ErrorCallingApi />;
  }

  if (!dimensions) return <NoContent />;

  return (
    <Slide className="select-none" index={imageIndex}>
      <div className="w-screen h-screen pointer-events-none">
        <DoujinshiImage src={imageSrc} />
      </div>
    </Slide>
  );
}
