'use server'

import { cookies } from 'next/headers';

export async function userLogin({userName, password}) {

  //login
  //cookie set

  let errorMessage
  if (userName == '')
  {
    errorMessage = {error: true, message: "Kullanıcı adı giriniz (server)", type: "warning"}
  } else if (password == ''){
    errorMessage = {error:true, message: "Şifre giriniz (server)", type: "warning"}
  }

  if (errorMessage)
    return errorMessage


  const res = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${userName}&password=${password}`
  })


  let auth

  try {
    auth = await res.json()
  } catch (error) {
    //
  }

  if (!auth){
    errorMessage = {error:true, message: "Kullanıcı adı veya şifre hatalı (server)", type: "error"}
    return errorMessage
  }

  cookies().set({
    name: 'token',
    value: `Bearer ${auth.token}`,
    secure: true,
    httpOnly: true,
    path: '/'
  })

  return auth
}