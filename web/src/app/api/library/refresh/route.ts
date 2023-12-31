import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const apiResponse = await axios.post(`${process.env.API_URL}/api/library/refresh`);

  return new NextResponse(null, { status: apiResponse.status });
}
