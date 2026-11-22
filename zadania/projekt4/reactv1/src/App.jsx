import { useState } from 'react'
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import {wydarzenia} from './wydarzenia.js'
import { useParams, useNavigate } from 'react-router-dom'
const MIASTA = [...new Set(wydarzenia.map(w => w.miasto))]

function ListaWydarzenPage(){
  const [aktywneMiasta, setAktywneMiasta] = useState(MIASTA)

  function przelaczMiasto(miasto){
    setAktywneMiasta(aktywne => 
      aktywne.includes(miasto)
      ? aktywne.filter(m => m !== miasto)
      : [...aktywne, miasto]
    )
  }

  const widoczne = wydarzenia.filter(w => aktywneMiasta.includes(w.miasto))

  return(
    <div className='container mt-4'>
      <h1>Wydarzenia i koncerty</h1>
      <div className='d-flex flex-wrap gap-3 mb-3'>
        {MIASTA.map(miasto => (
          <div className='form-switch form-check' key={miasto}>
            <input className='form-check-input' type='checkbox' role='switch' id={`miasto-${miasto}`}
            checked={aktywneMiasta.includes(miasto)} onChange={() => przelaczMiasto(miasto)}/>
            <label className='form-check-label' htmlFor={`miasto-${miasto}`}>{miasto}</label>
          </div>
        ))}
      </div>
      <div className='row g-3'>
        {widoczne.map(wydarzenie => (
          <div key={wydarzenie.id} className='col-12 col-md-4'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='card-title h5'>{wydarzenie.nazwa}</h3>
                <p className='text-body-secondary mb-2'>
                  {wydarzenie.miasto} - {wydarzenie.data}
                </p>
                <Link to={`/wydarzenie/${wydarzenie.id}`} className='btn btn-outline-primary btn-sm'>
                  Szczegoly
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SzczegolyWydarzeniaPage(){
  const { id } = useParams()
  const navigate = useNavigate()
  const wydarzenie = wydarzenia.find(w => w.id === Number(id))
  if(!wydarzenie){
    return(
      <div className='container mt-4'>
        <div className='alert alert-warning'>
          Nie znaleziono wydarzenia o numerze {id}
          <button type='button' className='btn btn-outline-primary' onClick={() => navigate(-1)}>
            Wstecz
          </button>
        </div>
      </div>
    )
  }
  return(
    <div className='container mt-4'>
      <h1>{wydarzenie.nazwa}</h1>
      <p>Miasto: {wydarzenie.miasto}</p>
      <p>Data: {wydarzenie.data}</p>
      <p>Cena: {wydarzenie.cena === 0 ? "Wstep wolny" : `${wydarzenie.cena} zl`}</p>
      <button type='button' className='btn btn-outline-primary' onClick={() => navigate(-1)}>
        Wstecz
      </button>
    </div>
  )
}

function NotFoundPage(){
  return(
    <div className='container mt-4'>
      <h1>Nie ma takiej strony</h1>
      <Link to="/">Wroc do listy</Link>
    </div>
  )
}
function App() {
  return(
    <Routes>
      <Route path='/' element={<ListaWydarzenPage/>}/>
      <Route path='/wydarzenie/:id' element={<SzczegolyWydarzeniaPage/>}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
