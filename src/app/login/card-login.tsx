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
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const { login } = useAuthStore();
  const router = useRouter();

  const { sendRequest, data, loading, error } = useFetchApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: async (values: { username: string; password: string }) => {
      const res = await sendRequest({
        method: "post",
        url: "auth/login",
        data: values,
      });
      if (!res) {
        throw new Error("No response from server");
      }
      return res;
    },
    onSuccess: async (datas) => {
      toast.success("Berhasil login");
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["check-auth"] });
      await login(datas?.userData?.role?.name);
    },
    onError: (err: any) => {
      toast.error("Username/password salah");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <Card className="bg-card-background flex text-clr-silver-v1 border-none w-[80%] md:w-96 lg:w-[500px]">
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
