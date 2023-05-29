import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
