'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { NavbarItem } from '@/app/components';
import { BuildApiQuery } from '@/helpers';

interface Props {
  active:
    | 'Home'
    | 'Library'
    | 'Artists'
    | 'Circles'
    | 'Categories'
    | 'Parodies'
    | 'Characters'
    | 'Tags'
    | 'Search'
    | 'Settings';
}

export default function Navbar({ active }: Props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchFilter = searchParams.get('search') ?? '';

  const [searchText, setSearchText] = useState<string>(searchFilter);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setSearchText(event.target.value);
  };

  const router = useRouter();

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchText) return false;

    setIsNavOpen(false);
    setIsDropdownMenuOpen(false);

    const query = BuildApiQuery({ searchFilter: searchText });

    router.push(`/doujinshi${query}`);
  };

  return (
    <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-blue-700 md:p-0 dark:hover:text-blue-500 select-none">
            同人誌
          </span>
        </Link>

        <div className="flex md:order-2">
          <form className="relative mx-2 hidden sm:block" onSubmit={onSubmitSearch}>
            <button
              type="submit"
              className="absolute inset-y-0 left-0 flex items-center pl-3 stroke-slate-200 hover:stroke-blue-700 hover:dark:stroke-blue-500 text-center"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </form>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => {
              setIsNavOpen((prev) => !prev);
            }}
          >
            <span
              className="absolute whitespace-nowrap p-0 overflow-hidden border-0"
              style={{ height: '1px', width: '1px', margin: '-1px' }}
            >
              Open main menu
            </span>

            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:w-auto md:flex md:order-1 ${
            isNavOpen ? 'md:flex' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <form className="relative mt-3 sm:hidden" onSubmit={onSubmitSearch}>
            <button
              type="submit"
              className="absolute inset-y-0 left-0 flex items-center pl-3 stroke-slate-200 hover:stroke-blue-700 hover:dark:stroke-blue-500 text-center"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </form>

          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 lg:space-x-8 xl:space-x-12 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavbarItem title="Home" href="/" isActive={active === 'Home'} />
            </li>
            <li>
              <NavbarItem title="Library" href="/doujinshi" isActive={active === 'Library'} />
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between select-none w-full md:border-0 md:w-auto dark:focus:text-white py-2 pl-3 pr-4 font-medium text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => setIsDropdownMenuOpen((prev) => !prev)}
              >
                Filter by
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`absolute translate-y-3 border-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  isDropdownMenuOpen ? '' : 'hidden'
                }`}
              >
                <ul
                  className="flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavbarItem title="Artists" href="/artists" isActive={active === 'Artists'} />
                  </li>
                  <li>
                    <NavbarItem title="Circles" href="/circles" isActive={active === 'Circles'} />
                  </li>
                  <li>
                    <NavbarItem
                      title="Categories"
                      href="/categories"
                      isActive={active === 'Categories'}
                    />
                  </li>
                  <li>
                    <NavbarItem
                      title="Parodies"
                      href="/parodies"
                      isActive={active === 'Parodies'}
                    />
                  </li>
                  <li>
                    <NavbarItem
                      title="Characters"
                      href="/characters"
                      isActive={active === 'Characters'}
                    />
                  </li>
                  <li>
                    <NavbarItem title="Tags" href="/tags" isActive={active === 'Tags'} />
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavbarItem title="Search" href="/search" isActive={active === 'Search'} />
            </li>
            <li>
              <NavbarItem title="Settings" href="/settings" isActive={active === 'Settings'} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
