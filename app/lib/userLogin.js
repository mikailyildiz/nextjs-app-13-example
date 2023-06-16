'use server'

import { cookies } from 'next/headers';

export async function userLogin() {

  //login
  //cookie set

  cookies().set({
    name: 'token',
    value: "abc123",
    secure: true,
    httpOnly: true,
    path: '/'
  })

  return true
}