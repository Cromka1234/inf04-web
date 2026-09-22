// Modal z formularzem "Dodaj zdjęcie" – na razie bez logiki wysyłki.
// Stan pola "tytuł" pokazany na sztywno jako błąd (is-invalid) – prawdziwa walidacja przyjdzie w MB6/MB7.
function AddPhotoModal() {
  return (
    <div
      className="modal fade"
      id="dodajZdjecie"
      tabIndex="-1"
      aria-labelledby="dodajZdjecieLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id="dodajZdjecieLabel">
              Dodaj zdjęcie
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Zamknij"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="tytul" className="form-label">
                    Tytuł
                  </label>
                  <input type="text" className="form-control is-invalid" id="tytul" />
                  <div className="invalid-feedback">
                    Podaj tytuł zdjęcia – to pole jest wymagane.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="kategoria" className="form-label">
                    Kategoria
                  </label>
                  <select className="form-select" id="kategoria" defaultValue="">
                    <option value="" disabled>
                      Wybierz kategorię...
                    </option>
                    <option value="gory">Góry</option>
                    <option value="morze">Morze</option>
                    <option value="miasto">Miasto</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="plik" className="form-label">
                    Plik ze zdjęciem
                  </label>
                  <input type="file" className="form-control" id="plik" accept="image/*" />
                  <div className="form-text">JPG lub PNG, maksymalnie 5 MB.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="opis" className="form-label">
                    Opis
                  </label>
                  <textarea className="form-control" id="opis" rows="3"></textarea>
                  <div className="form-text">
                    Jedno-dwa zdania: gdzie i kiedy powstało zdjęcie.
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="zgoda" />
                    <label className="form-check-label" htmlFor="zgoda">
                      Zgadzam się na publikację zdjęcia w galerii
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Anuluj
            </button>
            <button type="submit" className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPhotoModal