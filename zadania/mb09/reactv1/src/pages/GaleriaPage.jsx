import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useZdjecia } from '../hooks/useZdjecia.js'
import { usunZdjecie, przełączUlubione } from '../services/zdjecia.js'
import CategoryBar from '../components/CategoryBar.jsx'
import Gallery from '../components/Gallery.jsx'
import ZdjecieDnia from '../components/ZdjecieDnia.jsx'

function GaleriaPage() {
    const { zdjecia, setZdjecia, isLoading, error } = useZdjecia()
    const [aktywnaKategoria, setAktywnaKategoria] = useState('wszystkie')

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-2 text-muted">Ładowanie galerii...</p>
            </div>
        )
    }

    if (error) {
        return <div className="alert alert-danger m-4">Nie udało się pobrać danych: {error}</div>
    }

    if (zdjecia.length === 0) {
        return <div className="alert alert-secondary m-4">Katalog jest na razie pusty.</div>
    }

    const widoczne =
        aktywnaKategoria === 'wszystkie'
            ? zdjecia
            : zdjecia.filter(z => z.category === aktywnaKategoria)

    return (
        <>
            <header className="container py-4 d-flex justify-content-between align-items-center">
                <h1 className="mb-0">Galeria zdjęć</h1>
                <Link to="/dodaj" className="btn btn-primary">Dodaj zdjęcie</Link>
            </header>

            <main className="container">
                <CategoryBar aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />

                <p className="text-body-secondary">
                    Wyświetlono {widoczne.length} z {zdjecia.length} zdjęć
                </p>

                {widoczne.length === 0 && (
                    <div className="alert alert-warning">Nie znaleziono zdjęć w tej kategorii.</div>
                )}

                <Gallery
                    zdjecia={widoczne}
                    onUsun={id => setZdjecia(usunZdjecie(id))}
                    onPrzelacz={id => setZdjecia(przełączUlubione(id))}
                />

                <div className="mt-5">
                    <ZdjecieDnia />
                </div>
            </main>
        </>
    )
}

export default GaleriaPage