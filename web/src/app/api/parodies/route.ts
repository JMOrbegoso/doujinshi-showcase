import { NextRequest, NextResponse } from 'next/server';
import { Parody } from '@/models';
import axios from 'axios';

interface ParodyApiResponse {
  Name: string;
  Quantity: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<Parody[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<ParodyApiResponse[]>(`${process.env.API_URL}/api/parodies`);

  if (apiResponse.status === 200) {
    const responseBody: Parody[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
