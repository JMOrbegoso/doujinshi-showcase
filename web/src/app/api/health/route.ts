import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const {} = new URL(request.url);

  const apiResponse = await axios.get(`${process.env.API_URL}/api/health`);

  return new NextResponse(null, { status: apiResponse.status });
}
