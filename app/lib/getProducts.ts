export default async function getProducts(params: { limit: number, page: number }) {
  const {
    limit,
    page
  } = params

  const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}&page=${page}`, { cache: 'no-store' })

  return res.json()
}