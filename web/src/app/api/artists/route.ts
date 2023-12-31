import { NextRequest, NextResponse } from 'next/server';
import { Artist } from '@/models';
import axios from 'axios';

interface ArtistApiResponse {
  Name: string;
  Quantity: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<Artist[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<ArtistApiResponse[]>(`${process.env.API_URL}/api/artists`);

  if (apiResponse.status === 200) {
    const responseBody: Artist[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
