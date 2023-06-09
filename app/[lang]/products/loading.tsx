import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Skeleton count={4} height={40} width={100} />
      <Skeleton count={5} height={200} width={200} />
    </main>
  )
}