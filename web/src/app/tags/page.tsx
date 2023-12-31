'use client';

import React, { useEffect } from 'react';
import { useAppSelector, selectDarkModeStatus } from '@/lib/redux';
import { useGetTagsQuery } from '@/services/showcase-api';
import {
  DoujinshiPropertyButtonsCloud,
  Heading,
  Navbar,
  NavigateToTopButton,
} from '@/app/components';

export default function Page() {
  const darkMode = useAppSelector(selectDarkModeStatus);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const { data: tags, isLoading, isError } = useGetTagsQuery();

  return (
    <>
      <Navbar active="Tags" />

      <section className="text-center pt-20 px-4">
        <Heading title="Tags:" />

        <DoujinshiPropertyButtonsCloud
          data={tags?.map((a) => {
            return { name: a.Name, quantity: a.Quantity };
          })}
          isLoading={isLoading}
          isError={isError}
          hrefType="tag"
          justify="center"
        />
      </section>

      <div className="mt-4 mb-4">
        <NavigateToTopButton />
      </div>
    </>
  );
}
