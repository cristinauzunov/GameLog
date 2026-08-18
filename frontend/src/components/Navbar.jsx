import { useContext } from "react";
import {
  Navbar as NavbarBootstrap,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function faiLogout() {
    logout();
    navigate("/login");
  }

  // se non sei loggata, non mostro la navbar
  if (!token) {
    return null;
  }

  return (
    <NavbarBootstrap bg="dark" variant="dark" expand="lg">
      <Container>
        <NavbarBootstrap.Brand as={Link} to="/">
          GameLog
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle />
        <NavbarBootstrap.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              La mia collezione
            </Nav.Link>
            <Nav.Link as={Link} to="/cerca">
              Cerca giochi
            </Nav.Link>
            <Button variant="outline-light" onClick={faiLogout}>
              Logout
            </Button>
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}

export default Navbar;
