import { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import NavHeader from "./components/navHeader.jsx";
import EstablishmentsDescription from "./components/Establishment.jsx";
import Establishment from '../../surplusFood/entities/establishment.mjs';


function App() {

  const establishment1 = new Establishment(1, "McDonald", "Via roma 2", 123456, "Fast Food");
  const fakeEstablishments = [];
  fakeEstablishments.push(establishment1);

  const [establishments, setEstablishments] = useState(fakeEstablishments);

  return (
    <>
      <NavHeader/>
      <Container fluid className="mt-3">
        <EstablishmentsDescription establishments={establishments} setEstablishments={setEstablishments}/>
      </Container>
    </>
  )
}

export default App
