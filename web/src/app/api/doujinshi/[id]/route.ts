import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Doujinshi } from '@/models';

interface Params {
  params: {
    id: string;
  };
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
  { params }: Params,
): Promise<NextResponse<Doujinshi> | undefined> {
  const apiResponse = await axios.get<DoujinshiApiResponse>(
    `${process.env.API_URL}/api/doujinshi/${params.id}`,
  );

  if (apiResponse.status === 200) {
    const responseBody: Doujinshi = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
