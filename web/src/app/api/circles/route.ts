import { NextRequest, NextResponse } from 'next/server';
import { Circle } from '@/models';
import axios from 'axios';

interface CircleApiResponse {
  Name: string;
  Quantity: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<Circle[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<CircleApiResponse[]>(`${process.env.API_URL}/api/circles`);

  if (apiResponse.status === 200) {
    const responseBody: Circle[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
