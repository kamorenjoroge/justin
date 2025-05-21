import Link from 'next/link'
const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-7xl bg-back p-24'>
     <div className=' bg-primary text-white p-10 rounded-lg'>
      <Link href='/test'>Click Me </Link>
      </div>
      
    </div>
  )
}

export default Page