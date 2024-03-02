import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useSession, signOut } from "next-auth/react"

export default function Home(){

  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  )
}

// Guest
export const Guest = () => {
  return (
    <main className='container mx-auto text-center py-20'>
      <div className='text-4xl font-bold'>Guest Homepages</div>
      <div className='flex justify-center'>
        <Link href={'/login'} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">Sign In</Link>
      </div>
    </main>
  )
}

// Authorize User
export const User = ({session, handleSignOut}) => {
  return (
    <main className='container mx-auto text-center py-20'>
      <div className='text-4xl font-bold'>User Homepages</div>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign Out</button>
      </div>

      <div className='flex justify-center'>
        <Link href={'/dashboard'} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">dashboard</Link>
      </div>
    </main>
  )
}
// この下をコメントアウトするとグーグルログインが可能
// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req }) 

//   if(!session){
//     return{
//       redirect: {
//         destination:'/login',
//         permanent:false
//       }
//     }
//   }

//   return{
//     props:{session}
//   }
// }