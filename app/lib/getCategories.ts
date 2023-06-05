export default async function getCategories() {

  const res = await fetch('https://fakestoreapi.com/products/categories')

  return res.json()
}