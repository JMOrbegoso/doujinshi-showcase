'use client';

import React, { useEffect } from 'react';
import {
  useAppSelector,
  selectDarkModeStatus,
  selectQuantityOfDoujinshiShownOnHomePage,
} from '@/lib/redux';
import { ErrorCallingApi, LoadingSpinnerPage, DoujinshiDeck, Navbar } from '@/app/components';
import { BuildApiQuery } from '@/helpers';
import { useGetDoujinshiQuery } from '@/services/showcase-api';
import { Doujinshi } from '@/models';

export default function Page() {
  const quantityOfDoujinshiShownOnHomePage = useAppSelector(
    selectQuantityOfDoujinshiShownOnHomePage,
  );
  const darkMode = useAppSelector(selectDarkModeStatus);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const query = BuildApiQuery({
    quantity: quantityOfDoujinshiShownOnHomePage,
    random: true,
  });

  const { data, isLoading, isError } = useGetDoujinshiQuery(query);

  if (isLoading) return <LoadingSpinnerPage />;

  if (isError || !data) return <ErrorCallingApi />;

  const doujinshi: Doujinshi[] = data;

  return (
    <>
      <Navbar active={'Home'} />

      <section className="pt-20 px-4">
        <DoujinshiDeck doujinshi={doujinshi} />
      </section>
    </>
  );
}
