"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).refine(val => val === JSON.parse(localStorage.getItem("userSignUp"))["username"]),
  password: z.string().min(6, {
    message: "Password not much.",

  }).refine(val => val === JSON.parse(localStorage.getItem("userSignUp"))["password"])
})

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  const [isLogin , setIsLogIn] = useState(false)
  const handleLogIn = () => {
    if(JSON.parse(localStorage.getItem("userSignUp"))["password"] == form.getValues().password && JSON.parse(localStorage.getItem("userSignUp"))["username"] == form.getValues().username){
      setIsLogIn(true)
    }
    console.log(isLogin)
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className=" px-4 w-[400px] py-4">
        <CardDescription>Sign in</CardDescription>

        <CardTitle className="flex gap-4">
          <Link href="/auth/sign-in">Sign in</Link>
          <Link href="/auth/sign-up">Sign up</Link>
        </CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="enter username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={`${!isLogin ? "/auth/sign-in" : "/dashboard/"}`}><Button type="submit" onClick={() => handleLogIn()}>Submit</Button></Link>
          </form>
        </Form>
      </Card>
    </div>
  )
}
