import Image from "next/image";
import CashflowContainer from "@/components/Home/cashflow-container";
import Container from "@/components/common/container";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <Container>
      <Toaster />
      <CashflowContainer />
    </Container>
  );
}
