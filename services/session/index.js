'use server';

import { cookies } from 'next/headers';

const getServerCookie = async () => {
  const role = (await cookies()).get('session-user-role')?.value;

  return { role };
};

export const getRole = async () => {
  const { role } = await getServerCookie();

  return { status: 200, statusText: 'OK', data: { role }, error: null };
};
