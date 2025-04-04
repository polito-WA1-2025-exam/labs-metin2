import { Row, Col, Table } from 'react-bootstrap';

function EstablishmentsDescription (props) {
  return(
    <>
    <Row>
      <Col as="h2">Establishments:</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        <EstablishmentTable establishments={props.establishments} setEstablishments={props.setEstablishments} />
      </Col>
    </Row>
    </>
  );
}

function EstablishmentTable (props) {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine type</th>
          </tr>
        </thead>
        <tbody>
          { props.establishments.map((est) => <EstablishmentRow key={est.id} establishment={est} setEstablishments={props.setEstablishments} />) }
        </tbody>
      </Table>
    );
  }

  function EstablishmentRow(props) {
    return(
      <>
      <tr>
        <td>{props.establishment.name}</td>
        <td>{props.establishment.type_cuisine}</td>
      </tr>
      </>
    );
  }

export default EstablishmentsDescription;