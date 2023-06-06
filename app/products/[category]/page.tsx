import ProductsPage from '@/app/components/productsPage'
import getCategories from '@/app/lib/getCategories'
import getProducts from '@/app/lib/getProducts'
import getProductsInCategory from '@/app/lib/getProductsInCategory'

const totalProducts= 100
const itemsPerPage = 20

// type PageProps = {
//     params: { id: number };
//     searchParams: { [key: string]: string | string[] | undefined };
// }

//export const revalidate = 20;

export const metadata = {
  title: 'Products',
  description: 'Free shipping on millions of items.',
  openGraph: {
    title: 'Products',
    description: 'Free shipping on millions of items.',
    images: ['https://m.media-amazon.com/images/G/01/gno/sprites/nav-sprite-global-2x-hm-dsk-reorg._CB405937547_.png']
  },
  alternates: {
    canonical: '/products',
  },
}

export async function generateStaticParams() {
  const categories = await getCategories()
 
  return categories.map((item: [string]) => ({
    category: item,
  }));
}

export default async function Products({params, searchParams}: {params: { category: string }, searchParams: { [key: string]: number }}) {

  let page = 0
  //page = Number(searchParams?.page) || 0

  const category = params.category

  // const products = await getProductsInCategory({limit: itemsPerPage, page: page, category: category})
  // const categories = await getCategories()

  const productsData = getProductsInCategory({limit: itemsPerPage, page: page, category: category})
  const categoriesData = getCategories()
  const [products, categories] = await Promise.all([productsData, categoriesData]);

  return (
    <ProductsPage
      products={products}
      currentPage={page}
      totalProducts={totalProducts}
      itemsPerPage={itemsPerPage}
      category={category}
      categories={categories}
    />
  )
}
