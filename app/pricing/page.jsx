"use client";
import { Container } from "react-bootstrap";
import Plans from "@components/pricing/Plans";
import FaQs from "@components/pricing/FaQs";
import Partners from "@components/pricing/Partners";

const page = () => {
  return (
    <Container fluid>
      <h2 className="py-4 text-center">Plans & Pricing</h2>
      <Plans />
      <FaQs />
      <Partners />
    </Container>
  );
};

export default page;
