import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaAngleDoubleRight, FaAngleRight } from "react-icons/fa";

const Partners = () => {
  return (
    <div className="mt-5 py-5 bg-semi-light">
      <Container>
        <Row>
          <Col sm={12}>
            <h4 className="fw-bold fs-6 text-secondary text-center">
              Industry Standard
            </h4>
            <p className="fw-bold fs-4 text-center">
              Trusted by companies and individuals across Africa <br />
              to take their businesses to the next level
            </p>
            <div className="d-flex justify-content-around">
              <Image
                src="/assets/images/partners/pfan-logo.webp"
                height={60}
                width={140}
              />
              <Image
                src="/assets/images/partners/eldohub-logo.webp"
                height={60}
                width={140}
              />
              <Image
                src="/assets/images/partners/afdb-logo.webp"
                height={60}
                width={140}
              />
            </div>
          </Col>
        </Row>
        <div className="d-flex my-5 align-items-center justify-content-center">
          <Link
            href="#"
            className="fw-bold fs-6 text-secondary text-center no-underline"
          >
            View our customer stories <FaAngleDoubleRight />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Partners;
