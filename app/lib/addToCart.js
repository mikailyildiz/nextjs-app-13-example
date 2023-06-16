'use server';

// import { cookies } from 'next/headers';

export async function addToCart({productId, color, amount}) {

  //const amount = formData.get('amount')

  // const cartId = cookies().get('cartId')?.value;
  // console.log("cartId", cartId)

  let errorMessage

  if (color == '')
  {
    errorMessage = {error: true, message: "Renk bilgisi giriniz (server)", type: "warning"}
  } else if (amount < 1){
    errorMessage = {error:true, message: "Miktar en az 1 olmalı (server)", type: "error"}
  }

  if (errorMessage)
    return errorMessage

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