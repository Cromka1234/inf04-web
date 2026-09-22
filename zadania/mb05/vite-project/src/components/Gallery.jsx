import { Fragment } from 'react'
import photos from '../data/photos.json'
import PhotoCard from './PhotoCard.jsx'
import PhotoModal from './PhotoModal.jsx'

function Gallery() {
  return (
    <div id="galeria" className="row g-4">
      {photos.map(photo => (
        <Fragment key={photo.id}>
          <div className="col-12 col-md-6 col-lg-4">
            <PhotoCard {...photo} />
          </div>
          <PhotoModal {...photo} />
        </Fragment>
      ))}
    </div>
  )
}

export default Gallery