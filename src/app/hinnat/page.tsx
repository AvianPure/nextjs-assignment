import { NavBar } from '../components/navbar'


async function getData() {
  const res = await fetch('https://api.porssisahko.net/v1/latest-prices.json')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar/>
      <span>duck</span>
      <span>{JSON.stringify(data)}</span>
      <span>data is above me :)</span>
    </main>
    )
}