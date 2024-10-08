"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { fetchAuthorization } from "@/fetch/responsseserver";

const formSchema = z.object({
  username: z.string().min(2,
    {
      message: "неверное имя пользователя или пароль",
    }
  ).max(20, {
    message: "неверное имя пользователя или пароль",
  }),
  password: z.string().min(3, {
    message: 'неверное имя пользователя или пароль'
  }).max(8, {
    message: 'неверное имя пользователя или пароль'
  }),
})

export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) { 
    fetchAuthorization(values.username, values.password)
  }


  return (
    <div className="flex justify-center w-['200px'] mt-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Введите имя
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Введите пароль
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Отправить</Button>
      </form>
    </Form>
    </div>  
  );
}
