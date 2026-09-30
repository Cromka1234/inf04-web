import { useRef, useState } from 'react'

const kursy = [
  'Programowanie w C#',
  'Angular dla początkujących',
  'Kurs Django',
  'Wprowadzenie do SQL',
]

function App() {
  const imieNazwiskoRef = useRef(null)
  const numerKursuRef = useRef(null)
  const [szukaj, setSzukaj] = useState('')
  const [rosnaco, setRosnaco] = useState(true)
  const [status, setStatus] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    const imienazwisko = imieNazwiskoRef.current.value
    const numerkursu = Number(numerKursuRef.current.value)
    const kurs = kursy[numerkursu - 1]

    console.log(imienazwisko)

    if (kurs !== undefined) {
      console.log(kurs)
      setStatus({ typ: 'sukces', tresc: `${imienazwisko} zapisany(-a) na kurs: ${kurs}` })
    } else {
      console.log('Nieprawidłowy numer kursu')
      setStatus({ typ: 'blad', tresc: 'Nieprawidłowy numer kursu' })
    }
  }

  const widoczne = kursy
    .map((kurs, index) => ({ kurs, numer: index + 1 }))
    .filter(({ kurs }) =>
      kurs.toLowerCase().includes(szukaj.toLowerCase())
    )
    .sort((a, b) => rosnaco
      ? a.kurs.localeCompare(b.kurs)
      : b.kurs.localeCompare(a.kurs)
    )

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4">Zapisy na kursy</h1>
      <h2 className="h5">Liczba kursów: {kursy.length}</h2>

      <div className="d-flex gap-2 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Szukaj kursu..."
          value={szukaj}
          onChange={e => setSzukaj(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-secondary text-nowrap"
          onClick={() => setRosnaco(!rosnaco)}
        >
          Sortuj {rosnaco ? 'Z→A' : 'A→Z'}
        </button>
      </div>

      <p className="text-body-secondary">
        Znaleziono {widoczne.length} z {kursy.length} kursów
      </p>

      <ol>
        {widoczne.map(({ kurs, numer }) => (
          <li key={numer} value={numer}>{kurs}</li>
        ))}
      </ol>

      {status && (
        <div className={`alert alert-${status.typ === 'sukces' ? 'success' : 'danger'}`}>
          {status.tresc}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imienazwisko">Imię i nazwisko:</label>
          <input
            type="text"
            id="imienazwisko"
            className="form-control"
            ref={imieNazwiskoRef}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="numerkursu">Numer kursu:</label>
          <input
            type="number"
            id="numerkursu"
            className="form-control"
            ref={numerKursuRef}
          />
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">
            Zapisz do kursu
          </button>
        </div>
      </form>
    </div>
  )
}

export default App