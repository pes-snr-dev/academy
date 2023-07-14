import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
          <h1 className="text-center mb-4">PES Academy</h1>
          <p className="text-center mb-4">Awesome Landing page coming soon</p>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
