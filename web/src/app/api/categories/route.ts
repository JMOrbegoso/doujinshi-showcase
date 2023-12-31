import { NextRequest, NextResponse } from 'next/server';
import { Category } from '@/models';
import axios from 'axios';

interface CategoryApiResponse {
  Name: string;
  Quantity: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<Category[]> | undefined> {
  const {} = new URL(request.url);

  const apiResponse = await axios.get<CategoryApiResponse[]>(
    `${process.env.API_URL}/api/categories`,
  );

  if (apiResponse.status === 200) {
    const responseBody: Category[] = apiResponse.data;

    return NextResponse.json(responseBody);
  }
  return undefined;
}
