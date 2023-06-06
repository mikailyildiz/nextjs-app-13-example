export default async function getProductsInCategory(params: { limit: number, page: number, category: string }) {
  const {
    limit,
    page,
    category
  } = params

  const res = await fetch(`https://fakestoreapi.com/products/category/${category}/?limit=${limit}&page=${page}`,
    { next: { tags: ['collection'] } }
  )

  return res.json()
}