import { useState } from 'react'
import { zdjeciaStartowe } from './zdjecia.js'

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe)

  return (
    <div className="container mt-4">
      <h1>Kategorie zdjęć</h1>
      <div className="row g-3">
        {zdjecia.map(zdjecie => (
          <div key={zdjecie.id} className="col-12 col-sm-6 col-md-4">
            <img src={zdjecie.filename} alt={zdjecie.alt} className="img-fluid" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App