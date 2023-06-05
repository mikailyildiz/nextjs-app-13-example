import LinkButton from "../components/linkButton";
import getCategories from "../lib/getCategories";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    category: string;
  };
}) {

  const { category } = params
  const categories = await getCategories()

  console.log("params", params)

  return (
    <div>
      {categories.map((item: string, index: number) => (
        <LinkButton key={index} text={item} selectedCategory={category} />
      )) }
      <div>{children}</div>
    </div>
  )
}
