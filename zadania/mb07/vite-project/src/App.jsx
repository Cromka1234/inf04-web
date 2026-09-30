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

  function handleSubmit(event) {
    event.preventDefault()

    const imienazwisko = imieNazwiskoRef.current.value
    const numerkursu = Number(numerKursuRef.current.value)
    const kurs = kursy[numerkursu - 1]

    console.log(imienazwisko)

    if (kurs !== undefined) {
      console.log(kurs)
    } else {
      console.log('Nieprawidłowy numer kursu')
    }
  }

  const widoczne = kursy
    .map((kurs, index) => ({ kurs, numer: index + 1 }))
    .filter(({ kurs }) =>
      kurs.toLowerCase().includes(szukaj.toLowerCase())
    )

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4">Zapisy na kursy</h1>
      <h2 className="h5">Liczba kursów: {kursy.length}</h2>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Szukaj kursu..."
        value={szukaj}
        onChange={e => setSzukaj(e.target.value)}
      />

      <ol>
        {widoczne.map(({ kurs, numer }) => (
          <li key={numer} value={numer}>{kurs}</li>
        ))}
      </ol>

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