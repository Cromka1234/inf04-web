import { useState } from 'react';
import systemy from './wariant21';
import 'bootstrap/dist/css/bootstrap.min.css';

function Pozycja({ nazwa }) {
  return <li>{nazwa}</li>;
}

function App() {
  const [imie, setImie] = useState('');
  const [numer, setNumer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(imie);
    const index = Number(numer) - 1;
    if (systemy[index] !== undefined) {
      console.log(systemy[index]);
    } else {
      console.log("Nieprawidłowy numer systemu operacyjnego");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Liczba systemów operacyjnych: {systemy.length}</h4>
      <ol className="mb-4">
        {systemy.map((pozycja, index) => (
          <Pozycja key={index} nazwa={pozycja} />
        ))}
      </ol>
      <form onSubmit={handleSubmit} className="w-100">
        <div className="mb-3">
          <label className="form-label">Imię i nazwisko:</label>
          <input type="text" className="form-control w-50" value={imie} onChange={(e) => setImie(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Numer systemu operacyjnego:</label>
          <input type="number" className="form-control w-50" value={numer} onChange={(e) => setNumer(e.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-primary">Zatwierdź wybór</button>
      </form>
    </div>
  );
}

export default App;