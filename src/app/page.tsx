import Image from "next/image";
import CashflowContainer from "@/components/Home/cashflow-container";
import Container from "@/components/common/container";

export default function Home() {
  return (
    <Container>
      <CashflowContainer />
    </Container>
  );
}
