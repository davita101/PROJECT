"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface Student {

}
export default function page() {
  const [userSignUp, setUserSignUp] = useState<Student[]>(() => {
    if (typeof window !== "undefined") {
      const storedGroups = localStorage.getItem(`userSignUp`)
      return storedGroups ? JSON.parse(storedGroups) : [{ "username": "", "password": "" }];
    }
    return [{ "username": "", "password": "" }]
  })

  useEffect(() => {

    if (typeof window !== "undefined") {
      localStorage.setItem(`userSignUp`, JSON.stringify(userSignUp));
    }

  }, [userSignUp])

  return (
    <div className='flex justify-center items-center h-screen' >
      <Card className='px-4 py-4'>
        <Link href={"/auth/sign-in"}><Button >sign in</Button></Link>
        <Link href={"/auth/sign-up"}><Button variant={'ghost'}>sign up</Button></Link>
        <Link href={"/dashboard"}><Button variant={'ghost'} onClick={() => setUserSignUp([{ "username": "", "password": "" }])}>Without user</Button></Link>
      </Card>
    </div>
  )
}
