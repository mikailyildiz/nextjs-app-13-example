import BackButton from "@/app/components/backButton";
import getProduct from "@/app/lib/getProduct";
import Image from "next/image";

// type PageProps = {
//   params: { id: number };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

export async function generateMetadata({params}: {params: {id: number}}) {
  let product
  if (params.id)
    product = await getProduct(params.id);

  return {
    title: product.title,
    openGraph: {
      images: [product.image]
    }
  }
}

export default async function Products({params}: {params: {id: number}}) {

let product
if (params.id)
  product = await getProduct(params.id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <BackButton />
          <div >
            <Image
              src={product.image}
              alt={product.title}
              width="200"
              height="200"
              priority={true}
            />
            <h2>{product.title}</h2>
            <span>{product.price}</span>
            <p>{product.description}</p>
          </div>

        </main>
    )
}