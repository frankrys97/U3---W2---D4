// import { Component, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Modal,
  Button,
  Form,
  Container,
  Badge,
} from "react-bootstrap";
import logo from "../Netflix-assets/kisspng-netflix-streaming-media-television-show-logo-netflix-logo-5b35b03bb4e9d0.753613021530245179741.png";
import kidsImage from "../Netflix-assets/assets/kids_icon.png";
import profileImage from "../Netflix-assets/assets/avatar.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MyNavBar = () => {
  // state = {
  //   showModal: false,
  // };

  const [showModal, setShowModal] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const location = useLocation();

  const toggleModal = () => {
    // this.setState({ showModal: true });
    setShowModal(true);
  };

  const closeModal = () => {
    // this.setState({ showModal: false });
    setShowModal(false);
  };

  useEffect(() => {
    if (location.pathname === "/tvshows") {
      setPlaceholder("Search TV Shows");
    } else if (location.pathname === "/") {
      setPlaceholder("Search Movies");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Navbar variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/tvshows">
              TV Shows
            </NavLink>
            <Nav.Link href="#">Movies</Nav.Link>
            <Nav.Link href="#">Recently Added</Nav.Link>
            <Nav.Link href="#">My List</Nav.Link>
          </Nav>
          <Nav className="d-flex flex-column align-items-start flex-lg-row align-items-lg-center justify-content-between gap-4">
            <Button variant="link" className="text-white" onClick={toggleModal}>
              <i className="bi bi-search" style={{ fontSize: "23px" }}></i>
            </Button>
            <Modal
              show={showModal}
              onHide={() => {
                closeModal();
              }}
              backdrop="static"
              data-bs-theme="dark"
            >
              <Modal.Header closeButton>
                <Modal.Title className="fs-5 text-white">Search</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="d-flex gap-2" role="search">
                  <Form.Control type="search" placeholder={placeholder} />
                  <Button variant="danger" type="submit">
                    Search
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <img
              src={kidsImage}
              alt="kids"
              className="rounded-3"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="position-relative">
              <i
                className="bi bi-bell-fill"
                style={{ fontSize: "23px", color: "white" }}
              ></i>
              <Badge
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle rounded-circle p-1"
              >
                8+
              </Badge>
            </div>
            <NavDropdown
              title={
                <img
                  src={profileImage}
                  alt="media"
                  className="rounded-3"
                  style={{ width: "40px", height: "40px" }}
                />
              }
              id="basic-nav-dropdown"
              align={"end"}
              data-bs-theme="dark"
            >
              <NavDropdown.Item href="#">
                <img
                  src={profileImage}
                  alt="media"
                  style={{ width: "30px", height: "30px" }}
                  className="rounded-circle "
                />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="text-decoration-none text-white" to="/profile">
                  Account
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  className="text-decoration-none text-white"
                  to="/settings"
                >
                  Settings
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
