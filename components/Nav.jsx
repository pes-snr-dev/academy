"use client";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import LangaugeSelector from "./LanguageSelector";

const Header = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Link href="/" className="no-underline">
            <Navbar.Brand>
              <img
                src="/assets/images/logo.png"
                alt="logo"
                width="auto"
                height={20}
                className="me-2"
              />
              <span className="text-uppercase">PES Academy</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <NavDropdown title="Courses" id="courses">
                <NavDropdown.Item>
                  <Link href="/courses/random-id-1" className="no-underline">
                    Unit Economics
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link href="/courses/random-id-2" className="no-underline">
                    Due Diligence
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link href="/courses/random-id-3" className="no-underline">
                    Pricing
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item className="px-2">
                <Link href="/courses" className="no-underline">
                  Browse
                </Link>
              </Nav.Item>
              <Nav.Item className="px-2">
                <Link href="/pricing" className="no-underline">
                  Pricing
                </Link>
              </Nav.Item>

              {session?.user ? (
                <>
                  <NavDropdown
                    title={
                      <Image
                        src={session?.user.image}
                        width={25}
                        height={25}
                        className="rounded-circle"
                        alt="profile"
                      />
                    }
                    id="username"
                  >
                    <Link href="/profile/coach/" className="no-underline">
                      <NavDropdown.Item
                        className="d-flex align-items-center gap-2"
                        href="/profile/coach/"
                      >
                        <FaUserAlt />
                        Profile
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <Button
                        variant="primary"
                        className="nav-link"
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                      >
                        <FaSignInAlt /> Sign In
                      </Button>
                    ))}
                </>
              )}
              <div>
                <LangaugeSelector />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
