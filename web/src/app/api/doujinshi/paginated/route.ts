import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Doujinshi, PaginatedDoujinshi } from '@/models';
import { BuildApiQuery } from '@/helpers';

export interface PaginatedDoujinshiApiResponse {
  TotalItems: number;
  TotalPages: number;
  PageNumber: number;
  PageSize: number;
  Items: DoujinshiApiResponse[];
}

interface DoujinshiApiResponse {
  Id: string;
  Title: string;
  Artists: string[];
  Circles: string[];
  Pages: number;
  Category: string;
  Characters: string[];
  Parodies: string[];
  Url: string;
  Tags: string[];
  Cover: string;
  Images: string[];
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginatedDoujinshi> | undefined> {
  const { searchParams } = new URL(request.url);

  // Build query
  const searchFilter = searchParams.get('search');
  const quantity = searchParams.get('quantity');
  const random = searchParams.get('random');
  const titleFilters = searchParams.getAll('title');
  const artistFilters = searchParams.getAll('artist');
  const circleFilters = searchParams.getAll('circle');
  const categoryFilters = searchParams.getAll('category');
  const tagFilters = searchParams.getAll('tag');
  const parodyFilters = searchParams.getAll('parody');
  const characterFilters = searchParams.getAll('character');
  const pageNumber = searchParams.get('page_number');
  const pageSize = searchParams.get('page_size');

  const query = BuildApiQuery({
    searchFilter: searchFilter,
    quantity: quantity ? +quantity : 0,
    random: !!random,
    titleFilters: titleFilters.length > 0 ? titleFilters : [],
    artistFilters: artistFilters.length > 0 ? artistFilters : [],
    circleFilters: circleFilters.length > 0 ? circleFilters : [],
    categoryFilters: categoryFilters.length > 0 ? categoryFilters : [],
    characterFilters: characterFilters.length > 0 ? characterFilters : [],
    parodyFilters: parodyFilters.length > 0 ? parodyFilters : [],
    tagFilters: tagFilters.length > 0 ? tagFilters : [],
    pageNumber: pageNumber ? +pageNumber : 1,
    pageSize: pageSize ? +pageSize : 6,
  });

  // Send request
  const apiResponse = await axios.get<PaginatedDoujinshiApiResponse>(
    `${process.env.API_URL}/api/doujinshi/paginated${query}`,
  );

  if (apiResponse.status === 200) {
    const responseBody = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
