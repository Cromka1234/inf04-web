// src/App.jsx
import { useState } from 'react'
import { ksiazkiStartowe } from './ksiazki.js'

function App() {
  const [ksiazki, setKsiazki] = useState(ksiazkiStartowe)

  return (
    <div className="container mt-4">
      <h1>Katalog biblioteki</h1>
      <div className="row g-3">
        {ksiazki.map(ksiazka => (
          <div key={ksiazka.id} className="col-12 col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5">{ksiazka.tytul}</h3>
                <p className="text-body-secondary mb-1">{ksiazka.autor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App