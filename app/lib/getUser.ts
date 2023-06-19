import { cookies } from 'next/headers'

export default async function getUser() {
  //const headersInstance = headers();
  //const authorization = headersInstance.get('authorization');
  // Forward the authorization header

  const cookieStore = cookies()
  const token = cookieStore.get('token')

  let headers = {}
  if (token)
    headers = {authorization: token.value }

  const res = await fetch(`https://fakestoreapi.com/users/1`, 
  //{cache: 'no-store'}
  {
    headers
  }
  );

  return res.json();
}