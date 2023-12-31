'use client';

import React from 'react';
import { DoujinshiPropertyButtonsCloud, SeparatorLine } from '@/app/components';

interface Props {
  searchFilter?: string | null;
  titleFilters: string[];
  artistFilters: string[];
  circleFilters: string[];
  categoryFilters: string[];
  tagFilters: string[];
  parodyFilters: string[];
  characterFilters: string[];
}

export default function DoujinshiFiltersUsed({
  searchFilter,
  titleFilters,
  artistFilters,
  circleFilters,
  categoryFilters,
  tagFilters,
  parodyFilters,
  characterFilters,
}: Props) {
  if (
    !searchFilter &&
    titleFilters.length == 0 &&
    artistFilters.length == 0 &&
    circleFilters.length == 0 &&
    categoryFilters.length == 0 &&
    tagFilters.length == 0 &&
    parodyFilters.length == 0 &&
    characterFilters.length == 0
  )
    return <></>;

  return (
    <div className="p-4 border-blue-600 border-2 rounded-md">
      <h1 className="text-xl font-bold text-black dark:text-white"> {'Used filters:'} </h1>

      <div className="flex items-center w-full">
        <div className="grid p-4 w-full">
          {searchFilter && (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Search term:</div>

              <div className="text-base font-semibold text-black dark:text-white">
                {searchFilter}
              </div>
            </div>
          )}

          {titleFilters.length > 0 && (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Titles:</div>

              <div className="text-base font-semibold text-black dark:text-white">
                {titleFilters.join(', ')}
              </div>
            </div>
          )}

          {artistFilters.length > 0 ? (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Artists:</div>

              <DoujinshiPropertyButtonsCloud
                data={artistFilters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                hrefType="artist"
                justify={'start'}
              />
            </div>
          ) : (
            <></>
          )}

          {circleFilters.length > 0 ? (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Circles:</div>

              <DoujinshiPropertyButtonsCloud
                data={circleFilters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                hrefType="circle"
                justify={'start'}
              />
            </div>
          ) : (
            <></>
          )}

          {categoryFilters.length > 0 ? (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Categories:</div>

              <DoujinshiPropertyButtonsCloud
                data={categoryFilters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                hrefType="category"
                justify={'start'}
              />
            </div>
          ) : (
            <></>
          )}

          {parodyFilters.length > 0 ? (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Parodies:</div>

              <DoujinshiPropertyButtonsCloud
                data={parodyFilters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                hrefType="parody"
                justify={'start'}
              />
            </div>
          ) : (
            <></>
          )}

          {characterFilters.length > 0 ? (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Characters:</div>

              <DoujinshiPropertyButtonsCloud
                data={characterFilters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                hrefType="character"
                justify={'start'}
              />
            </div>
          ) : (
            <></>
          )}

          {tagFilters.length > 0 ? (
            <div className="flex items-center my-2">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Tags:</div>

              <DoujinshiPropertyButtonsCloud
                data={tagFilters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                hrefType="tag"
                justify={'start'}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
