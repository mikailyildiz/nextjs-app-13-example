import { generateQueryStr } from "../[lang]/utils"

export default async function getProducts(params: { limit: number, page: number }) {

  const res = await fetch(generateQueryStr('https://fakestoreapi.com/products?', params))

  return res.json()
}