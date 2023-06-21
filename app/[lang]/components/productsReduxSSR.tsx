import { store } from "@/app/store"


export default function ProductsReduxSSR() {

  const productList = store.getState().products.list

  return (
    <div>
      {productList.map((item: any, index: number) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}