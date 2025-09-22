"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { log } from "node:console";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username minimal 3 karakter",
  }),
  password: z.string().min(6, {
    message: "Password minimal 6 karakter",
  }),
});

const CardLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { sendRequest, data, loading, error } = useFetchApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const datas = await sendRequest({
      method: "post",
      url: "auth/login",
      data: values,
    });
    console.log(datas);
    localStorage.setItem("role", datas?.userData?.role?.name);

    error ? null : form.reset();
  }

  return (
    <Card className="bg-card-background text-clr-silver-v1 border-none w-full md:w-96">
      <CardHeader>
        <CardTitle className="text-center font-bold">LOGIN</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        {...field}
                        className="pr-10" // kasih space buat ikon
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="cursor-pointer" />
                      ) : (
                        <Eye size={18} className="cursor-pointer" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer bg-clr-pumpkin hover:!bg-orange-600"
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CardLogin;
