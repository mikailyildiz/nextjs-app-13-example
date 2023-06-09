import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import Pagination from '@/app/[lang]/components/pagination'
import LinkButton from '../linkButton'


type PageProps = {
  products: any[]
  currentPage: number
  totalProducts: number
  itemsPerPage: number
  category?: string,
  categories: [string]
}

export default function ProductsPage ({ products, currentPage, totalProducts, itemsPerPage, category, categories }: PageProps) {


  const pageLink = category? `/products/${category}` : '/products'


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Products Page{category && ` - ${decodeURIComponent(category)}`}
        </p>
        <div>
        <Link href={'/'}>Home page</Link>
        </div>
      </div>

      <div>
      {categories.map((item: string, index: number) => (
        <LinkButton selectedCategory={category} key={index} text={item} url={`/products/${encodeURIComponent(item)}`}/>
      )) }
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          {products.map((item: any, index: number) => (
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
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          renderPageLink={(pageNumber) => pageNumber == 1 ? pageLink : `${pageLink}?page=${pageNumber}`}
        />
      </div>

    </main>
  )
}