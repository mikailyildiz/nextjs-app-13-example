import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import Pagination from '@/app/components/pagination'
import getProducts from '@/app/lib/getProducts'

const totalProducts= 100
const itemsPerPage = 20

// type PageProps = {
//     params: { id: number };
//     searchParams: { [key: string]: string | string[] | undefined };
// }

export const metadata = {
  title: 'Products',
  description: 'Free shipping on millions of items.',
  openGraph: {
    title: 'Products',
    description: 'Free shipping on millions of items.',
    images: ['https://m.media-amazon.com/images/G/01/gno/sprites/nav-sprite-global-2x-hm-dsk-reorg._CB405937547_.png']
  }
}


export default async function Products({searchParams}: {searchParams: { [key: string]: number }}) {

  const page = Number(searchParams?.page) || 0
  const products = await getProducts({limit: itemsPerPage, page: page})

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Products Page
        </p>
        <div>
        <Link href={'/'}>Home page</Link>
        </div>
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          {!products.message && products.map((item: any, index: number) => (
            <Link key={item.id} href={`/product/${item.id}`} className={styles.productCard}>
              <Image 
                src={item.image}
                alt={item.title}
                width="100"
                height="100"
                priority={index < 3}
              />
              {item.title}
              <p>{item.category} - {item.price}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Pagination
          totalItems={totalProducts}
          currentPage={page}
          itemsPerPage={itemsPerPage}
          renderPageLink={(pageNumber) => pageNumber == 1 ? '/products' : `/products?page=${pageNumber}`}
        />
      </div>

    </main>
  )
}
