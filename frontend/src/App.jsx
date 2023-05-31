import React from 'react';
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}
