import Image from 'next/image'
import Link from 'next/link'
import Pagination from '@/app/[lang]/components/pagination'
import getProducts from '@/app/lib/getProducts'
import ProductsPage from '../components/productsPage'
import getCategories from '../../lib/getCategories'
import { cookies } from 'next/headers'

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

  let page = 0

  // page = Number(searchParams?.page) || 0
  
  // const products = await getProducts({limit: itemsPerPage, page: page})
  // const categories = await getCategories()

  const productsData = getProducts({limit: itemsPerPage, page: page})
  const categoriesData = getCategories()
  const [products, categories] = await Promise.all([productsData, categoriesData]);

  const cookieStore = cookies()
  const cookieBookmarks = cookieStore.get('bookmarks')
  const parseBookmarks = cookieBookmarks ? JSON.parse(cookieBookmarks.value) : []


  return (
   <ProductsPage
    products={products}
    currentPage={page}
    totalProducts={totalProducts}
    itemsPerPage={itemsPerPage}
    categories={categories}
    bookmarks={parseBookmarks}
   />
  )
}
