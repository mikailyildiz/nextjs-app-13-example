export default async function getProducts(params: { limit: number, page: number }) {
  const {
    limit,
    page
  } = params

  const res = await fetch(`https://car-data.p.rapidapi.com/cars?limit=${limit}&page=${page}`, {
    headers: {
      'X-RapidAPI-Key': '8ae64da025mshd21566c45ee9c3cp1332d8jsn7b361ec6038a',
      'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
    }
  })

  return res.json()
}