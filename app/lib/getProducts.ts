import { cookies } from 'next/headers'

import { generateQueryStr } from "../[lang]/utils"

export default async function getProducts(params: { limit: number, page: number }) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  let headers = {}
  if (token)
    headers = {authorization: `Bearer ${token.value}`}

  const res = await fetch(generateQueryStr('https://fakestoreapi.com/products?', params), {
    headers
  })

  console.log("myheaders", headers)

  return res.json()
}