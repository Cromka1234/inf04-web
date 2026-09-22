function PhotoCard({ id, title, description, category, image, alt }) {
  const KOLOR_KATEGORII = {
    gory: 'success',
    morze: 'primary',
    miasto: 'warning'
  }

  const NAZWA_KATEGORII = {
    gory: 'Góry',
    morze: 'Morze',
    miasto: 'Miasto'
  }

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
        <button
          type="button"
          className="btn btn-outline-primary mt-auto"
          data-bs-toggle="modal"
          data-bs-target={`#zdjecie${id}`}
        >
          Powiększ
        </button>
      </div>
    </div>
  )
}

export default PhotoCard