import getCategories from "@/app/lib/getCategories"
import LinkButton from "../linkButton"

export default async function CategoryMenu({category}:{category: string}) {

  const categories = await getCategories()

  return (
    <>
      {/* <h3>{categories[99].title}</h3> */}
      {categories.map((item: string, index: number) => (
        <LinkButton selectedCategory={category} key={index} text={item} url={`/products/${encodeURIComponent(item)}`}/>
      )) }
    </>
  )

}