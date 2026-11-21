import { useEffect, useState } from 'react'

function App() {
  const [rowery, setRowery] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [szukaj, setSzukaj] = useState('')

  useEffect(() => {
    async function wczytaj() {
      try {
        const odpowiedz = await fetch('/rowery.json')
        const dane = await odpowiedz.json()
        setRowery(dane)
      } catch (e) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    wczytaj()
  }, [])

  const widoczne = rowery.filter(rower =>
    rower.model.toLowerCase().includes(szukaj.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="spinner-border" role="status" />
        <span className="ms-2">Ładowanie...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  if (rowery.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-secondary">Brak rowerów</div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h1>Wypożyczalnia rowerów</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Szukaj po modelu..."
        value={szukaj}
        onChange={event => setSzukaj(event.target.value)}
      />
      {widoczne.length === 0 && (
        <div className="alert alert-secondary">Brak wyników</div>
      )}
      <div className="row g-3">
        {widoczne.map(rower => (
          <div key={rower.id} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5">{rower.model}</h3>
                <span className="badge text-bg-secondary">{rower.typ}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App