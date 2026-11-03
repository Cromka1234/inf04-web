import PhotoCard from './PhotoCard'

function Gallery({ zdjecia, onUsun, onPrzelacz }) {
    return (
        <div id="galeria" className="row g-4">
            {zdjecia.map(zdjecie => (
                <div key={zdjecie.id} className="col-12 col-md-6 col-lg-4">
                    <PhotoCard
                        {...zdjecie}
                        onUsun={() => onUsun(zdjecie.id)}
                        onPrzelacz={() => onPrzelacz(zdjecie.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Gallery