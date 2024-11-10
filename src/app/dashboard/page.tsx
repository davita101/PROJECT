import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex h-full flex-col justify-center items-center'>
      <CardTitle className='md:text-[80px] text-[40px] text-center '>Hello this is Bank Home page </CardTitle>
      <Link href={"/dashboard/products"}><Button className='text-[30px] px-10 py-10'>Learn More</Button></Link>
      <div className='mx-10'>
      </div>
    </div>
  )
}
