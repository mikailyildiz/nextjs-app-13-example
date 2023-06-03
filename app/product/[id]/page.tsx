

async function getProduct(id: number) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)

    return res.json();
}

export default async function Products({params}: {params: {id: number}}) {

let product
if (params.id)
  product = await getProduct(params.id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div >
            <h2>{product.title}</h2>
            <span>{product.price}</span>
            <p>{product.description}</p>
          </div>

        </main>
    )
}