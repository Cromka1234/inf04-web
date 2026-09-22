const NAZWA_KATEGORII = { gory: 'Góry', morze: 'Morze', miasto: 'Miasto' }
const KOLOR_KATEGORII = { gory: 'success', morze: 'primary', miasto: 'dark' }

function PhotoCard({ title, description, category, image, alt }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={image} className="card-img-top" alt={alt} />
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{title}</h3>
        <p>
          <span className={`badge text-bg-${KOLOR_KATEGORII[category]}`}>
            {NAZWA_KATEGORII[category]}
          </span>
        </p>
        <p className="card-text text-body-secondary">{description}</p>
      </div>
    </div>
  )
}

export default PhotoCard