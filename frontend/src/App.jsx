import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
export default function App() {
  return (
    <>
      <Navbar />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}
