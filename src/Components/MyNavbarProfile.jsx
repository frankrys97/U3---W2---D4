import { Container, Navbar } from "react-bootstrap";
import logo from "../Netflix-assets/kisspng-netflix-streaming-media-television-show-logo-netflix-logo-5b35b03bb4e9d0.753613021530245179741.png";
import { Link } from "react-router-dom";

function MyNavProfile() {
  return (
    <Navbar variant="dark" expand="lg" className="mt-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MyNavProfile;
