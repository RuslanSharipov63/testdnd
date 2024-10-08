"use client";
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
import { fetcnRegistration } from "@/fetch/responsseserver";
import AlertCustomComponent from "@/components/ui/customcomponent/AlertCustomComponent";

const formSchema = z.object({
  email: z.string().email({ message: "некорректный email" }),
  first_name: z
    .string()
    .min(3, {
      message: "имя минимум 2 знака",
    })
    .max(20, {
      message: "имя максимум 20 знаков",
    }),
  last_name: z
    .string()
    .min(3, {
      message: "фамилия минимум 2 знака",
    })
    .max(20, {
      message: "фамилия максимум 20 знаков",
    }),
  username: z
    .string()
    .min(3, {
      message: "username минимум 2 знака",
    })
    .max(20, {
      message: "username максимум 20 знаков",
    }),
  password: z
    .string()
    .min(8, {
      message: "пароль минимум 8 символов",
    })
    .max(10, {
      message: "пароль максимум 10 символов",
    }),
});

const Registration = () => {
    const router = useRouter();
  const [alertState, useAlertState] = useState({
    status: false,
    title: "",
    description: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetcnRegistration(values).then((text) => {
      if (text.message === "логин занят" || text.message === "email занят") {
        useAlertState({
          ...alertState,
          status: true,
          title: "произола ошибка",
          description: text.message,
        });
        setTimeout(() => {
          useAlertState({
            ...alertState,
            status: false,
          });
        }, 2000);
      } else {
        router.push("/");
      }
    });
  }

  return (
    <div className="flex flex-col items-center">
      {alertState.status === true && (
        <AlertCustomComponent
          title={alertState.title}
          description={alertState.description}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Введите email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Введите фамилию</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Введите username</FormDescription>
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
          <Button type="submit">Регистрация</Button>
        </form>
      </Form>
    </div>
  );
};

export default Registration;
