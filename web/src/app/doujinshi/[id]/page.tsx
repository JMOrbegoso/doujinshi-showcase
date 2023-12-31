'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, selectDarkModeStatus } from '@/lib/redux';
import { DoujinshiDetails, DoujinshiImages, Navbar, NavigateToTopButton } from '@/app/components';

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

  return (
    <>
      <Navbar active="Library" />

      <div className="pt-20 px-4">
        <section className="flex flex-row justify-center">
          <DoujinshiDetails doujinshiId={id} />
        </section>

        <section className="flex flex-col pb-4">
          <div className="text-center text-lg font-bold text-black dark:text-white mb-2">
            <span>Content:</span>
          </div>

          <DoujinshiImages doujinshiId={id} />
        </section>

        <div className="mt-4 mb-4">
          <NavigateToTopButton />
        </div>
      </div>
    </>
  );
}
