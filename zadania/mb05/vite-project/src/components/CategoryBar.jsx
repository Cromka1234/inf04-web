function CategoryBar() {
  return (
    <div id="kategorie" className="d-flex flex-wrap gap-2 mb-4">
      <button type="button" className="btn btn-outline-primary active" aria-pressed="true">
        Wszystkie
      </button>
      <button type="button" className="btn btn-outline-primary">
        Góry
      </button>
      <button type="button" className="btn btn-outline-primary">
        Morze
      </button>
      <button type="button" className="btn btn-outline-primary">
        Miasto
      </button>
    </div>
  )
}

export default CategoryBar