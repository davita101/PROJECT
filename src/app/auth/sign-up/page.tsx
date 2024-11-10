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
import { useEffect, useState } from "react"
import Link from "next/link"




const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),

})

export default function signUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
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
  
  const [userSignUp, setUserSignUp] = useState<Student[]>(() => {
    if (typeof window !== "undefined") {
      const storedGroups = localStorage.getItem(`userSignUp`)
      return storedGroups ? JSON.parse(storedGroups) : form.getValues();
    }
    return form.getValues();
  })
  const handleSigIng = () => {
    const value = form.getValues()
    setUserSignUp(value)
  }


  useEffect(() => {

    if (typeof window !== "undefined") {
      localStorage.setItem(`userSignUp`, JSON.stringify(userSignUp));
    }
  }, [userSignUp])

  return (
    <div className="flex justify-center items-center h-screen">

      <Card className=" px-4 w-[400px] py-4">
        
      <CardDescription>Sign up</CardDescription>

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
                    <Input type="password" className="w-full" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" onClick={() => handleSigIng()}>Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
