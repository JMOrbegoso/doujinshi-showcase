'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, selectDarkModeStatus } from '@/lib/redux';
import {
  DoujinshiFiltersUsed,
  DoujinshiInfiniteScroll,
  ErrorCallingApi,
  LoadingSpinnerPage,
  Navbar,
  NavigateToTopButton,
} from '@/app/components';
import { useGetPaginatedDoujinshiQuery } from '@/services/showcase-api';
import { BuildApiQuery } from '@/helpers';

const PAGE_SIZE = 50;

export default function Page() {
  const darkMode = useAppSelector(selectDarkModeStatus);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const searchParams = useSearchParams();

  const searchFilter = searchParams.get('search');
  const titleFilters = searchParams.getAll('title');
  const artistFilters = searchParams.getAll('artist');
  const circleFilters = searchParams.getAll('circle');
  const categoryFilters = searchParams.getAll('category');
  const tagFilters = searchParams.getAll('tag');
  const parodyFilters = searchParams.getAll('parody');
  const characterFilters = searchParams.getAll('character');

  const query = BuildApiQuery({
    searchFilter,
    titleFilters,
    artistFilters,
    circleFilters,
    categoryFilters,
    tagFilters,
    parodyFilters,
    characterFilters,
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  });

  const { data, isLoading, isError } = useGetPaginatedDoujinshiQuery(query);

  if (isLoading) return <LoadingSpinnerPage />;

  if (isError || !data) return <ErrorCallingApi />;

  return (
    <>
      <Navbar active="Library" />

      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Found {data.TotalItems} doujinshi:
        </h1>

        <div className="py-4 px-4">
          <DoujinshiFiltersUsed
            searchFilter={searchFilter}
            titleFilters={titleFilters}
            artistFilters={artistFilters}
            circleFilters={circleFilters}
            categoryFilters={categoryFilters}
            tagFilters={tagFilters}
            parodyFilters={parodyFilters}
            characterFilters={characterFilters}
          />
        </div>

        <DoujinshiInfiniteScroll
          searchFilter={searchFilter}
          titleFilters={titleFilters}
          artistFilters={artistFilters}
          circleFilters={circleFilters}
          categoryFilters={categoryFilters}
          tagFilters={tagFilters}
          parodyFilters={parodyFilters}
          characterFilters={characterFilters}
          initialPage={data}
          pageSize={PAGE_SIZE}
        />

        <div className="mt-4 mb-4">
          <NavigateToTopButton />
        </div>
      </div>
    </>
  );
}
