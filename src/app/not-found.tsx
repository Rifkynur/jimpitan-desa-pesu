"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px] shadow-xl rounded-2xl bg-card-background">
        <CardHeader className="flex flex-col items-center text-clr-silver">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
          <CardTitle className="text-2xl font-bold">404 - Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-clr-silver-v1">
          <>
            <p>Halaman yang kamu cari tidak ditemukan.</p>
            <p className="mt-1">
              Coba periksa kembali URL atau kembali ke beranda.
            </p>
          </>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Kembali</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
