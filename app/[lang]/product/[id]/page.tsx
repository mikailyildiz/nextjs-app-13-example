import AddToCart from '@/app/[lang]/components/addToCart'
import BackButton from '@/app/[lang]/components/backButton'
import CategoryMenu from '@/app/[lang]/components/categoryMenu'
import getProduct from '@/app/lib/getProduct'
import Image from 'next/image'

import { Locale } from '../../../../i18n-config'
import { getDictionary } from '../../../../get-dictionary'

// type PageProps = {
//   params: { id: number };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

export async function generateMetadata({params}: {params: {id: number}}) {
  let product
  if (params.id)
    product = await getProduct(params.id)

  return {
    title: product.title,
    openGraph: {
      images: [product.image]
    }
  }
}

export default async function Products({params: {id, lang}}: {params: {id: number, lang: Locale}}) {

  const dictionary = await getDictionary(lang)

let product
if (id)
  product = await getProduct(id);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <BackButton />
          <div >
            <CategoryMenu category={encodeURIComponent(product.category)} />
            <Image
              src={product.image}
              alt={product.title}
              width="200"
              height="200"
              priority={true}
            />
            <div>
              <AddToCart dictionary={dictionary.cart}/>
            </div>
            <p>Current locale: {lang}</p>
            <h2>{product.title}</h2>
            <span>{product.price}</span>
            <p>{product.description}</p>
          </div>

        </main>
    )
}