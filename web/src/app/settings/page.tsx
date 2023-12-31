'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Heading, Navbar } from '@/app/components';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import {
  quantityOfDoujinshiShownOnHomePageSlice,
  selectDarkModeStatus,
  selectQuantityOfDoujinshiShownOnHomePage,
  selectVerticalSwipe,
  verticalSwipeSlice,
} from '@/lib/redux';
import { setDarkTheme, setLightTheme } from '@/lib/redux/slices/darkModeSlice/thunks';
import { showcaseApi, useRefreshLibraryMutation } from '@/services/showcase-api';

const MIN_DOUJINSHI_QUANTITY_IN_HOMEPAGE = 1;
const MAX_DOUJINSHI_QUANTITY_IN_HOMEPAGE = 30;

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

  const verticalSwipe = useAppSelector(selectVerticalSwipe);

  const [
    quantityOfDoujinshiShownOnHomePageInputValue,
    setQuantityOfDoujinshiShownOnHomePageInputValue,
  ] = useState<string>('');

  const [refreshLibrary, { isLoading, isError }] = useRefreshLibraryMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuantityOfDoujinshiShownOnHomePageInputValue(quantityOfDoujinshiShownOnHomePage.toString());
  }, [quantityOfDoujinshiShownOnHomePage]);

  const [isDoujinshiQuantityInHomepageValid, setIsDoujinshiQuantityInHomepageValid] =
    useState<boolean>(true);

  const refreshLibraryButtonEvent = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await refreshLibrary();

    dispatch(showcaseApi.util.resetApiState());
  };

  const handleVerticalSwipeCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) dispatch(verticalSwipeSlice.actions.enableVerticalSwipe());
    else dispatch(verticalSwipeSlice.actions.disableVerticalSwipe());
  };

  const DarkModeCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) dispatch(setDarkTheme());
    else dispatch(setLightTheme());
  };

  const onChangeQuantityOfDoujinshiShownOnHomePage = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuantityOfDoujinshiShownOnHomePageInputValue(value);

    const newQuantityOfDoujinshiShownOnHomePage = Number.parseInt(value);
    console.log('newQuantityOfDoujinshiShownOnHomePage', newQuantityOfDoujinshiShownOnHomePage);

    if (
      newQuantityOfDoujinshiShownOnHomePage >= MIN_DOUJINSHI_QUANTITY_IN_HOMEPAGE &&
      newQuantityOfDoujinshiShownOnHomePage <= MAX_DOUJINSHI_QUANTITY_IN_HOMEPAGE
    ) {
      setIsDoujinshiQuantityInHomepageValid(true);

      dispatch(
        quantityOfDoujinshiShownOnHomePageSlice.actions.setQuantityOfDoujinshiShownOnHomePage(
          newQuantityOfDoujinshiShownOnHomePage,
        ),
      );
    } else {
      setIsDoujinshiQuantityInHomepageValid(false);
    }
  };

  return (
    <>
      <Navbar active="Settings" />

      <section className="pt-20 px-4">
        <div>
          <Heading title="Appearance:" />

          <div className="mx-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={darkMode}
                onChange={DarkModeCheckboxChange}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Dark theme
              </span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <Heading title={`Library Management: ${isLoading ? '🔃' : ''}`} />

          <div className="mx-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 p-2 rounded-full"
              onClick={refreshLibraryButtonEvent}
            >
              Refresh Library
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Heading title="Home page configuration:" />

          <div className="mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Number of doujinshi in the Home page ({MIN_DOUJINSHI_QUANTITY_IN_HOMEPAGE}~
              {MAX_DOUJINSHI_QUANTITY_IN_HOMEPAGE}):
              {isDoujinshiQuantityInHomepageValid ? '✅' : '⚠️'}
            </label>

            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Number of doujinshi in the home page."
              required
              value={quantityOfDoujinshiShownOnHomePageInputValue}
              onChange={onChangeQuantityOfDoujinshiShownOnHomePage}
            ></input>
          </div>
        </div>

        <div className="mt-4">
          <Heading title="Reading settings:" />

          <div className="mx-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={verticalSwipe}
                onChange={handleVerticalSwipeCheckboxChange}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Vertical swiping in slider (Horizontal by default)
              </span>
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
