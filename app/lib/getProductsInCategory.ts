import { generateQueryStr } from "../utils"

export default async function getProductsInCategory(params: { limit: number, page: number, category: string }) {
  const {
    category
  } = params


  const res = await fetch(generateQueryStr(`https://fakestoreapi.com/products/category/${category}/?`, params),
    { next: { tags: ['collection'] } }
  )

  return res.json()
}