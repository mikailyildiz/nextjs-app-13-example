
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {


  return (
      <div>
        <h2>Product Layout</h2>
        {children}
        </div>
  )
}
