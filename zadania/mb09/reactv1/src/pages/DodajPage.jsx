import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useZdjecia } from '../hooks/useZdjecia.js'
import { dodajZdjecie } from '../services/zdjecia.js'

const PUSTY_FORMULARZ = { title: '', category: '', image: '', description: '' }

function DodajPage() {
    const navigate = useNavigate()
    const { isLoading, error } = useZdjecia()
    const [formularz, setFormularz] = useState(PUSTY_FORMULARZ)

    function zmienPole(pole) {
        return event => setFormularz({ ...formularz, [pole]: event.target.value })
    }

    function obslugaSubmit(event) {
        event.preventDefault()
        dodajZdjecie({
            title: formularz.title,
            category: formularz.category,
            image: formularz.image,
            imageLarge: formularz.image,
            alt: formularz.title,
            description: formularz.description,
        })
        navigate('/')
    }

    if (isLoading) return <p className="text-muted m-4">Ładowanie...</p>
    if (error) return <div className="alert alert-danger m-4">{error}</div>

    return (
        <div className="container mt-4">
            <h1>Dodaj zdjęcie</h1>
            <form onSubmit={obslugaSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="tytul" className="form-label">Tytuł</label>
                    <input id="tytul" className="form-control" value={formularz.title} onChange={zmienPole('title')} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="kategoria" className="form-label">Kategoria</label>
                    <select id="kategoria" className="form-select" value={formularz.category} onChange={zmienPole('category')}>
                        <option value="" disabled>Wybierz kategorię...</option>
                        <option value="gory">Góry</option>
                        <option value="morze">Morze</option>
                        <option value="miasto">Miasto</option>
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="obrazek" className="form-label">Adres URL zdjęcia</label>
                    <input id="obrazek" className="form-control" placeholder="https://..." value={formularz.image} onChange={zmienPole('image')} />
                </div>
                <div className="col-12">
                    <label htmlFor="opis" className="form-label">Opis</label>
                    <textarea id="opis" className="form-control" rows="3" value={formularz.description} onChange={zmienPole('description')} />
                </div>
                <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Zapisz</button>
                    <Link to="/" className="btn btn-secondary">Anuluj</Link>
                </div>
            </form>
        </div>
    )
}

export default DodajPage