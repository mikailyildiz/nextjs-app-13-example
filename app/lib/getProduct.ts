export default async function getProduct(id: number) {
    //const headersInstance = headers();
    //const authorization = headersInstance.get('authorization');
    // Forward the authorization header
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, 
    //{cache: 'no-store'}
    );

    return res.json();
  }