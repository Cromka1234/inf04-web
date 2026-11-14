
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Gallery from './Gallery.jsx'

const przykladoweZdjecia = [
  { id: 1, title: 'Morskie Oko', description: 'Tafla jeziora o świcie.', category: 'gory', image: 'https://przyklad.pl/1.jpg', alt: 'Morskie Oko', favorite: false },
  { id: 2, title: 'Latarnia morska', description: 'Biała latarnia na klifie.', category: 'morze', image: 'https://przyklad.pl/2.jpg', alt: 'Latarnia morska', favorite: false },
  { id: 3, title: 'Starówka nocą', description: 'Rynek oświetlony latarniami.', category: 'miasto', image: 'https://przyklad.pl/3.jpg', alt: 'Starówka nocą', favorite: true },
]

describe('Gallery', () => {
  it('renderuje dokładnie tyle kart, ile elementów w danych', () => {
    render(
      <MemoryRouter>
        <Gallery zdjecia={przykladoweZdjecia} onUsun={() => {}} onPrzelacz={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getAllByRole('link', { name: 'Powiększ' })).toHaveLength(3)
  })
})