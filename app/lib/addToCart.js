// 'use server';

// import { cookies } from 'next/headers';

export async function addToCart(formData) {

  console.log("formData", formData)

  const amount = formData.get('amount')
  console.log("amount:", amount)

  // const cartId = cookies().get('cartId')?.value;
  // console.log("cartId", cartId)

  const res = await fetch('https://fakestoreapi.com/carts',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        userId:5,
        date:new Date('2020-02-03'),
        products:[{productId:5,quantity:amount},{productId:1,quantity:amount}]
    }
    )
  });


  const product = await res.json()

  console.log("product:", product)

  return product
}