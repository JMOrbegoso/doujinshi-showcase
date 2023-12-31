import { NextRequest, NextResponse } from 'next/server';
import { Character } from '@/models';
import axios from 'axios';

interface CharacterApiResponse {
  Name: string;
  Quantity: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<Character[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<CharacterApiResponse[]>(
    `${process.env.API_URL}/api/characters`,
  );

  if (apiResponse.status === 200) {
    const responseBody: Character[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
