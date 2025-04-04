import { Container, Navbar } from 'react-bootstrap';

function NavHeader (props) {
  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Navbar.Brand>test</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavHeader;