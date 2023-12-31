'use client';

import React from 'react';
import {
  ErrorCallingApi,
  LoadingSpinnerPage,
  DoujinshiPropertyButtonsCloud,
  NoContent,
  SeparatorLine,
  DoujinshiImage,
} from '@/app/components';
import { useGetDoujinshiByIdQuery } from '@/services/showcase-api';
import { Doujinshi } from '@/models';

interface Props {
  doujinshiId: string;
}

export default function DoujinshiDetails({ doujinshiId }: Props) {
  const { data, isLoading, isError } = useGetDoujinshiByIdQuery(doujinshiId);

  if (isLoading) return <LoadingSpinnerPage />;

  if (isError) return <ErrorCallingApi />;

  if (!data) return <NoContent />;

  const doujinshi: Doujinshi = data as Doujinshi;

  return (
    <div className="flex items-center w-full">
      <div className="hidden sm:flex justify-center items-center w-80 h-96 sm:w-64 sm:h-80">
        <DoujinshiImage alt={doujinshi.Title} src={doujinshi.Cover} priority />
      </div>

      <div className="w-full h-full p-4">
        <div className="text-2xl font-bold text-black dark:text-white">{doujinshi.Title}</div>

        {doujinshi.Parodies.length > 0 ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Parodies:</div>

              <DoujinshiPropertyButtonsCloud
                data={doujinshi.Parodies.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                isLoading={isLoading}
                isError={isError}
                hrefType="parody"
                justify={'start'}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Characters.length > 0 ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Characters:</div>

              <DoujinshiPropertyButtonsCloud
                data={doujinshi.Characters.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                isLoading={isLoading}
                isError={isError}
                hrefType="character"
                justify={'start'}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Artists.length > 0 ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Artists:</div>

              <DoujinshiPropertyButtonsCloud
                data={doujinshi.Artists.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                isLoading={isLoading}
                isError={isError}
                hrefType="artist"
                justify={'start'}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Circles.length > 0 ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Circles:</div>

              <DoujinshiPropertyButtonsCloud
                data={doujinshi.Circles.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                isLoading={isLoading}
                isError={isError}
                hrefType="circle"
                justify={'start'}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Category ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Category:</div>

              <DoujinshiPropertyButtonsCloud
                data={[{ name: doujinshi.Category, quantity: undefined }]}
                isLoading={isLoading}
                isError={isError}
                hrefType="category"
                justify={'start'}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Tags.length > 0 ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Tags:</div>

              <DoujinshiPropertyButtonsCloud
                data={doujinshi.Tags.map((a) => {
                  return { name: a, quantity: undefined };
                })}
                isLoading={isLoading}
                isError={isError}
                hrefType="tag"
                justify={'start'}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Pages ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Pages:</div>
              <div className="text-base font-semibold text-black dark:text-white">
                {doujinshi.Pages}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {doujinshi.Url ? (
          <div>
            <SeparatorLine />

            <div className="flex items-center">
              <div className="mr-2 text-lg font-bold text-black dark:text-white">Url:</div>
              <a
                className="text-base font-semibold text-black dark:text-white"
                href={doujinshi.Url}
                target="_blank"
              >
                {doujinshi.Url}
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
