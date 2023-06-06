export default async function getCategories() {

  const res = await fetch('https://fakestoreapi.com/products/categories',
  //{cache: 'no-store'}
  )

  return res.json()
}