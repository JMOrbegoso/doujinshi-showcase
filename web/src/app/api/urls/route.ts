import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest): Promise<NextResponse<string[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<string[]>(`${process.env.API_URL}/api/urls`);

  if (apiResponse.status === 200) {
    const responseBody: string[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
