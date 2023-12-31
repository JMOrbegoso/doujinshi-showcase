'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, selectDarkModeStatus } from '@/lib/redux';
import { ImagesCarousel } from '@/app/components';

export default function Page() {
  const darkMode = useAppSelector(selectDarkModeStatus);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const params = useParams();
  const id = params.id as string;
  const startWithPage = params.page as string;

  const startWith = parseInt(startWithPage) || 0;

  const router = useRouter();

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      router.back();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  });

  return (
    <section>
      <ImagesCarousel doujinshiId={id} initialIndex={startWith} />
    </section>
  );
}
