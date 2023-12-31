import { NextRequest, NextResponse } from 'next/server';
import { Tag } from '@/models';
import axios from 'axios';

interface TagApiResponse {
  Name: string;
  Quantity: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<Tag[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<TagApiResponse[]>(`${process.env.API_URL}/api/tags`);

  if (apiResponse.status === 200) {
    const responseBody: Tag[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
