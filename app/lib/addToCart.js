'use server';

// import { cookies } from 'next/headers';

export async function addToCart({productId, color, amount}) {

  //const amount = formData.get('amount')

  // const cartId = cookies().get('cartId')?.value;
  // console.log("cartId", cartId)

  const res = await fetch('https://fakestoreapi.com/carts',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        userId:5,
        date:new Date('2020-02-03'),
        products:[{productId:productId, quantity:amount, color: color}]
    }
    )
  });


  const product = await res.json()

  return product
}