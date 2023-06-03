import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Products',
  description: 'Free shipping on millions of items.',
  openGraph: {
    title: 'Products',
    description: 'Free shipping on millions of items.',
    images: ['https://m.media-amazon.com/images/G/01/gno/sprites/nav-sprite-global-2x-hm-dsk-reorg._CB405937547_.png']
  }
}

async function getCars() {

  const res = await fetch(`https://car-data.p.rapidapi.com/cars?limit=10&page=0`, {
    headers: {
      'X-RapidAPI-Key': '8ae64da025mshd21566c45ee9c3cp1332d8jsn7b361ec6038a',
      'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
    }
  })

  return res.json()
}

export default async function Products() {

  const cars = await getCars()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Products Page
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div>
        <Link href={'/'}>Home page</Link>
        </div>
      </div>

      <div>
        {!cars.message && cars.map((item: any, index: number) => (
          <Link key={item.id} href={`/product/${index+1}`}>
             <Image 
              src={`https://picsum.photos/id/${index}/200/300`}
              alt={item.model}
              width="100"
              height="100"
              priority={index < 5}
            />
            {item.model}
            <p>{item.make} - {item.type} - {item.year}</p>
          </Link>
        ))}
      </div>

    </main>
  )
}
