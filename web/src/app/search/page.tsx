'use client';

import {
  LoadingSpinner,
  DoujinshiPropertyCheckbox,
  Navbar,
  SearchButton,
  Collapsible,
} from '@/app/components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildApiQuery } from '@/helpers';
import { useAppSelector, selectDarkModeStatus } from '@/lib/redux';
import {
  useGetArtistsQuery,
  useGetCirclesQuery,
  useGetCategoriesQuery,
  useGetCharactersQuery,
  useGetParodiesQuery,
  useGetTagsQuery,
} from '@/services/showcase-api';

interface Checkbox {
  name: string;
  quantity: number;
  checked: boolean;
}

export default function Page() {
  const darkMode = useAppSelector(selectDarkModeStatus);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const [searchTitle, setSearchTitle] = useState<string>('');

  const [artistCheckboxes, setArtistCheckboxes] = useState<Checkbox[]>();
  const [circleCheckboxes, setCircleCheckboxes] = useState<Checkbox[]>();
  const [categoryCheckboxes, setCategoryCheckboxes] = useState<Checkbox[]>();
  const [characterCheckboxes, setCharacterCheckboxes] = useState<Checkbox[]>();
  const [parodyCheckboxes, setParodyCheckboxes] = useState<Checkbox[]>();
  const [tagCheckboxes, setTagCheckboxes] = useState<Checkbox[]>();

  const {
    data: artists,
    isLoading: isArtistsLoading,
    error: isArtistsError,
  } = useGetArtistsQuery();
  const {
    data: circles,
    isLoading: isCirclesLoading,
    error: isCirclesError,
  } = useGetCirclesQuery();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: isCategoriesError,
  } = useGetCategoriesQuery();
  const {
    data: characters,
    isLoading: isCharactersLoading,
    error: isCharactersError,
  } = useGetCharactersQuery();
  const {
    data: parodies,
    isLoading: isParodiesLoading,
    error: isParodiesError,
  } = useGetParodiesQuery();
  const { data: tags, isLoading: isTagsLoading, error: isTagsError } = useGetTagsQuery();

  useEffect(() => {
    if (isArtistsLoading || !artists) return;

    const checkboxes: Checkbox[] = artists.map((a) => {
      return {
        name: a.Name,
        quantity: a.Quantity,
        checked: false,
      };
    });
    setArtistCheckboxes(checkboxes);
  }, [artists, isArtistsLoading]);

  useEffect(() => {
    if (isCirclesLoading || !circles) return;

    const checkboxes: Checkbox[] = circles.map((a) => {
      return {
        name: a.Name,
        quantity: a.Quantity,
        checked: false,
      };
    });
    setCircleCheckboxes(checkboxes);
  }, [circles, isCirclesLoading]);

  useEffect(() => {
    if (isCategoriesLoading || !categories) return;

    const checkboxes: Checkbox[] = categories.map((a) => {
      return {
        name: a.Name,
        quantity: a.Quantity,
        checked: false,
      };
    });
    setCategoryCheckboxes(checkboxes);
  }, [categories, isCategoriesLoading]);

  useEffect(() => {
    if (isCharactersLoading || !characters) return;

    const checkboxes: Checkbox[] = characters.map((a) => {
      return {
        name: a.Name,
        quantity: a.Quantity,
        checked: false,
      };
    });
    setCharacterCheckboxes(checkboxes);
  }, [characters, isCharactersLoading]);

  useEffect(() => {
    if (isParodiesLoading || !parodies) return;

    const checkboxes: Checkbox[] = parodies.map((a) => {
      return {
        name: a.Name,
        quantity: a.Quantity,
        checked: false,
      };
    });
    setParodyCheckboxes(checkboxes);
  }, [parodies, isParodiesLoading]);

  useEffect(() => {
    if (isTagsLoading || !tags) return;

    const checkboxes: Checkbox[] = tags.map((a) => {
      return {
        name: a.Name,
        quantity: a.Quantity,
        checked: false,
      };
    });
    setTagCheckboxes(checkboxes);
  }, [tags, isTagsLoading]);

  const handleArtistCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setArtistCheckboxes((prevState) =>
      prevState?.map((item) => (item.name === name ? { ...item, checked } : item)),
    );
  };

  const handleCircleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCircleCheckboxes((prevState) =>
      prevState?.map((item) => (item.name === name ? { ...item, checked } : item)),
    );
  };

  const handleCategoryCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCategoryCheckboxes((prevState) =>
      prevState?.map((item) => (item.name === name ? { ...item, checked } : item)),
    );
  };

  const handleTagCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setTagCheckboxes((prevState) =>
      prevState?.map((item) => (item.name === name ? { ...item, checked } : item)),
    );
  };

  const handleParodyCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setParodyCheckboxes((prevState) =>
      prevState?.map((item) => (item.name === name ? { ...item, checked } : item)),
    );
  };

  const handleCharacterCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCharacterCheckboxes((prevState) =>
      prevState?.map((item) => (item.name === name ? { ...item, checked } : item)),
    );
  };

  const handleSearchTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = BuildApiQuery({
      titleFilters: searchTitle.length > 0 ? [searchTitle] : undefined,
      artistFilters: artistCheckboxes?.filter((c) => c.checked).map((c) => c.name),
      circleFilters: circleCheckboxes?.filter((c) => c.checked).map((c) => c.name),
      categoryFilters: categoryCheckboxes?.filter((c) => c.checked).map((c) => c.name),
      tagFilters: tagCheckboxes?.filter((c) => c.checked).map((c) => c.name),
      parodyFilters: parodyCheckboxes?.filter((c) => c.checked).map((c) => c.name),
      characterFilters: characterCheckboxes?.filter((c) => c.checked).map((c) => c.name),
    });

    router.push(`/doujinshi${query}`);
  };

  return (
    <>
      <Navbar active="Search" />

      <section className="pt-20 px-4">
        <div className="flex min-h-screen flex-col items-center justify-between">
          <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
            <form onSubmit={handleSubmit} className="text-center">
              <h1 className="text-base font-bold text-black dark:text-white">Title:</h1>

              <div className="mb-4">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Title..."
                  autoFocus
                  value={searchTitle}
                  onChange={handleSearchTitleChange}
                />
              </div>

              {!isArtistsLoading && artistCheckboxes ? (
                artistCheckboxes.length > 0 ? (
                  <div className="my-4">
                    <Collapsible title="Filter by Artists:">
                      <div className="flex flex-row flex-wrap justify-center">
                        {artistCheckboxes.map((checkbox) => (
                          <DoujinshiPropertyCheckbox
                            key={checkbox.name}
                            value={checkbox.name}
                            quantity={checkbox.quantity}
                            checked={checkbox.checked}
                            onChange={handleArtistCheckboxChange}
                          />
                        ))}
                      </div>
                    </Collapsible>
                  </div>
                ) : null
              ) : (
                <LoadingSpinner />
              )}

              {!isCirclesLoading && circleCheckboxes ? (
                circleCheckboxes.length > 0 ? (
                  <div className="my-4">
                    <Collapsible title="Filter by Circles:">
                      <div className="flex flex-row flex-wrap justify-center">
                        {circleCheckboxes.map((checkbox) => (
                          <DoujinshiPropertyCheckbox
                            key={checkbox.name}
                            value={checkbox.name}
                            quantity={checkbox.quantity}
                            checked={checkbox.checked}
                            onChange={handleCircleCheckboxChange}
                          />
                        ))}
                      </div>
                    </Collapsible>
                  </div>
                ) : null
              ) : (
                <LoadingSpinner />
              )}

              {!isCategoriesLoading && categoryCheckboxes ? (
                categoryCheckboxes.length > 0 ? (
                  <div className="my-4">
                    <Collapsible title="Filter by Categories:">
                      <div className="flex flex-row flex-wrap justify-center">
                        {categoryCheckboxes.map((checkbox) => (
                          <DoujinshiPropertyCheckbox
                            key={checkbox.name}
                            value={checkbox.name}
                            quantity={checkbox.quantity}
                            checked={checkbox.checked}
                            onChange={handleCategoryCheckboxChange}
                          />
                        ))}
                      </div>
                    </Collapsible>
                  </div>
                ) : null
              ) : (
                <LoadingSpinner />
              )}

              {!isParodiesLoading && parodyCheckboxes ? (
                parodyCheckboxes.length > 0 ? (
                  <div className="my-4">
                    <Collapsible title="Filter by Parodies:">
                      <div className="flex flex-row flex-wrap justify-center">
                        {parodyCheckboxes.map((checkbox) => (
                          <DoujinshiPropertyCheckbox
                            key={checkbox.name}
                            value={checkbox.name}
                            quantity={checkbox.quantity}
                            checked={checkbox.checked}
                            onChange={handleParodyCheckboxChange}
                          />
                        ))}
                      </div>
                    </Collapsible>
                  </div>
                ) : null
              ) : (
                <LoadingSpinner />
              )}

              {!isCharactersLoading && characterCheckboxes ? (
                characterCheckboxes.length > 0 ? (
                  <div className="my-4">
                    <Collapsible title="Filter by Characters:">
                      <div className="flex flex-row flex-wrap justify-center">
                        {characterCheckboxes.map((checkbox) => (
                          <DoujinshiPropertyCheckbox
                            key={checkbox.name}
                            value={checkbox.name}
                            quantity={checkbox.quantity}
                            checked={checkbox.checked}
                            onChange={handleCharacterCheckboxChange}
                          />
                        ))}
                      </div>
                    </Collapsible>
                  </div>
                ) : null
              ) : (
                <LoadingSpinner />
              )}

              {!isTagsLoading && tagCheckboxes ? (
                tagCheckboxes.length > 0 ? (
                  <div className="my-4">
                    <Collapsible title="Filter by Tags:">
                      <div className="flex flex-row flex-wrap justify-center">
                        {tagCheckboxes.map((checkbox) => (
                          <DoujinshiPropertyCheckbox
                            key={checkbox.name}
                            value={checkbox.name}
                            quantity={checkbox.quantity}
                            checked={checkbox.checked}
                            onChange={handleTagCheckboxChange}
                          />
                        ))}
                      </div>
                    </Collapsible>
                  </div>
                ) : null
              ) : (
                <LoadingSpinner />
              )}

              <div className="p-2">
                <SearchButton />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
