export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
}

export async function GET() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await api.get('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieHeader = await buildCookieHeader(); // <-- await
    const body = await request.json();

    const res = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
