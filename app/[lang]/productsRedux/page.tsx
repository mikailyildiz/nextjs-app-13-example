import getProducts from "@/app/lib/getProducts"
import { setProducts } from "@/app/slice/productsSlice"
import { store } from "@/app/store"
import ProductsReduxSSR from "../components/productsReduxSSR"


export default async function ProductsRedux() {


  const products = await getProducts({limit: 10, page: 0})

  store.dispatch(setProducts({list: products}))


  return (
    <main>
      <ProductsReduxSSR />
    </main>
  )
}