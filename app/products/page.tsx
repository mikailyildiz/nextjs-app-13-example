import Image from 'next/image'
import Link from 'next/link'
import Pagination from '@/app/components/pagination'
import getProducts from '@/app/lib/getProducts'
import ProductsPage from '../components/productsPage'

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
   <ProductsPage
    products={products}
    currentPage={page}
    totalProducts={totalProducts}
    itemsPerPage={itemsPerPage}
   />
  )
}
