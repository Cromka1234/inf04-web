import { useParams, useNavigate } from 'react-router-dom'
import { useZdjecia } from '../hooks/useZdjecia.js'

function ZdjeciePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { zdjecia, isLoading, error } = useZdjecia()

    if (isLoading) return <p className="text-muted m-4">Ładowanie...</p>
    if (error) return <div className="alert alert-danger m-4">{error}</div>

    const zdjecie = zdjecia.find(z => z.id === Number(id))

    if (!zdjecie) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">Nie ma zdjęcia o numerze {id}.</div>
                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Wstecz</button>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <h1>{zdjecie.title}</h1>
            <img src={zdjecie.imageLarge} className="img-fluid rounded" alt={zdjecie.alt} />
            <p className="mt-3">{zdjecie.description}</p>
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Wstecz</button>
        </div>
    )
}

export default ZdjeciePage