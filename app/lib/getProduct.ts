export default async function getProduct(id: number) {
    //const headersInstance = headers();
    //const authorization = headersInstance.get('authorization');
    // Forward the authorization header
    console.log("istek", id)
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    return res.json();
  }