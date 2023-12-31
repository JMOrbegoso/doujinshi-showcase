'use client';

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch } from '@/lib/redux';
import { DoujinshiCard, LoadingSpinner } from '@/app/components';
import { showcaseApi } from '@/services/showcase-api';
import { BuildApiQuery } from '@/helpers';
import { Doujinshi, PaginatedDoujinshi } from '@/models';
import Link from 'next/link';

interface Props {
  searchFilter?: string | null | undefined;
  titleFilters?: string[];
  artistFilters?: string[];
  circleFilters?: string[];
  categoryFilters?: string[];
  tagFilters?: string[];
  parodyFilters?: string[];
  characterFilters?: string[];
  pageSize: number;
  initialPage: PaginatedDoujinshi;
}

export default function DoujinshiInfiniteScroll({
  searchFilter,
  titleFilters,
  artistFilters,
  circleFilters,
  categoryFilters,
  tagFilters,
  parodyFilters,
  characterFilters,
  pageSize,
  initialPage,
}: Props) {
  const [items, setItems] = useState<Doujinshi[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setItems(initialPage.Items);
    setHasMore(initialPage.TotalPages > initialPage.PageNumber);
    setPage(
      initialPage.TotalPages > initialPage.PageNumber
        ? initialPage.PageNumber + 1
        : initialPage.PageNumber,
    );
  }, [initialPage]);

  const dispatch = useAppDispatch();

  const fetchMoreData = async () => {
    if (!hasMore) {
      return;
    }

    const query = BuildApiQuery({
      searchFilter,
      titleFilters,
      artistFilters,
      circleFilters,
      categoryFilters,
      tagFilters,
      parodyFilters,
      characterFilters,
      pageNumber: page,
      pageSize: pageSize,
    });

    const { data, isLoading, isError } = await dispatch(
      showcaseApi.endpoints.getPaginatedDoujinshi.initiate(`${query}`),
    );

    if (isError || !data) {
      setIsError(true);
      setHasMore(false);
      return;
    }

    setIsError(false);
    setItems((prevItems) => [...prevItems, ...data.Items]);
    setHasMore(data.TotalPages > data.PageNumber);
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<LoadingSpinner />}
    >
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap justify-center gap-2">
          {items.map((d) => (
            <Link
              className="transition transform hover:-translate-y-2 w-80 h-96 sm:w-64 sm:h-80"
              key={d.Id}
              href={`/doujinshi/${d.Id}`}
            >
              <DoujinshiCard doujinshi={d} />
            </Link>
          ))}
        </div>

        {isError && (
          <div className="mt-4 text-center text-red-500">
            ❌ No more items could be fetched due to an API error.
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}
