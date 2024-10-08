"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchAuthorization } from "@/fetch/responsseserver";
import AlertCustomComponent from "@/components/ui/customcomponent/AlertCustomComponent";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "неверное имя пользователя или пароль",
    })
    .max(20, {
      message: "неверное имя пользователя или пароль",
    }),
  password: z
    .string()
    .min(3, {
      message: "неверное имя пользователя или пароль",
    })
    .max(8, {
      message: "неверное имя пользователя или пароль",
    }),
});

export default function Home() {
  const [alertState, useAlertState] = useState<{
    status: boolean;
    title: string;
    description: string;
  }>({ status: false, title: "", description: "" });

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetchAuthorization(values.username, values.password).then((text) => {
      if (text?.message === "вы авторизованы") {
        router.push("/articleslist");
      } else if (text?.message === "неверный логин или пароль") {
        useAlertState({
          ...alertState,
          status: true,
          title: "произошла ошибка",
          description: text?.message,
        });
        setTimeout(() => {
          useAlertState({
            ...alertState,
            status: false,
          });
        }, 2000);
      } else {
        useAlertState({
          ...alertState,
          status: true,
          title: "произошла ошибка",
          description: "попробуйте еще раз",
        });
        setTimeout(() => {
          useAlertState({
            ...alertState,
            status: false,
          });
        }, 2000);
      }
    });
  }

  return (
    <div className="flex flex-col items-center">
      {alertState.status === true && (
        <div className="w-40 mt-4">
          <AlertCustomComponent
            title={alertState.title}
            description={alertState.description}
          />
        </div>
      )}
      <div className="w-40 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Введите имя</FormDescription>
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
                  <FormDescription>Введите пароль</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Войти</Button>
          </form>
        </Form>
      </div>
      <div className="flex justify-start mt-4 w-40">
        <Button variant="secondary">
          <Link href="/registration">Регистрация</Link>
        </Button>
      </div>
    </div>
  );
}
