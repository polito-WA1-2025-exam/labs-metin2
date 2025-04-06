import { useEffect, useState } from "react";
import { getEstablishments } from "./services/api/establishmentApi";

function App() {
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    getEstablishments()
      .then((data) => {
        console.log("Received from server:", data);
        setEstablishments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Establishments List</h1>
      <ul>
        {establishments.map((est) => (
          <li key={est.id}>
            {est.id} - {est.name} - {est.address} - {est.phone} - {est.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
