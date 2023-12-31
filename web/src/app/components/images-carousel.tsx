import React, { useEffect } from 'react';
import {
  ErrorCallingApi,
  ImagesCarouselSlide,
  LoadingSpinnerPage,
  NoContent,
} from '@/app/components';
import { selectVerticalSwipe, useAppSelector } from '@/lib/redux';
import { useGetDoujinshiByIdQuery } from '@/services/showcase-api';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import { Doujinshi } from '@/models';

import 'pure-react-carousel/dist/react-carousel.es.css';

interface Props {
  doujinshiId: string;
  initialIndex: number;
}

export default function ImagesCarousel({ doujinshiId, initialIndex }: Props) {
  const { data, isLoading, isError } = useGetDoujinshiByIdQuery(doujinshiId);

  const verticalSwipe = useAppSelector(selectVerticalSwipe);

  useEffect(() => {
    const slider = document.getElementById('slider');

    if (slider) {
      slider.focus();
    }
  });

  if (isLoading) return <LoadingSpinnerPage />;

  if (isError) return <ErrorCallingApi />;

  if (!data) return <NoContent />;

  const doujinshi: Doujinshi = data as Doujinshi;

  return (
    <CarouselProvider
      className="w-screen h-screen"
      naturalSlideWidth={window.innerWidth}
      naturalSlideHeight={window.innerHeight}
      step={1}
      dragStep={1}
      totalSlides={doujinshi.Images.length}
      currentSlide={initialIndex < doujinshi.Images.length ? initialIndex : doujinshi.Images.length}
      visibleSlides={1}
      orientation={verticalSwipe ? 'vertical' : 'horizontal'}
      disableKeyboard={false}
    >
      <Slider id="slider" className="w-full h-full" autoFocus>
        {doujinshi.Images.map((image) => (
          <ImagesCarouselSlide
            key={doujinshi.Images.indexOf(image)}
            imageIndex={doujinshi.Images.indexOf(image)}
            imageSrc={image}
          />
        ))}
      </Slider>
    </CarouselProvider>
  );
}
