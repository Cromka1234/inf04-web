
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import DodajPage from './DodajPage.jsx'
import { dodajZdjecie } from '../services/zdjecia.js'

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const prawdziwy = await vi.importActual('react-router-dom')
  return { ...prawdziwy, useNavigate: () => navigateMock }
})

vi.mock('../services/zdjecia.js', () => ({
  pobierzZdjecia: () => Promise.resolve([]),
  dodajZdjecie: vi.fn(),
}))

describe('DodajPage', () => {
  it('wysyła wypełnione dane i przechodzi na stronę główną', async () => {
    render(
      <MemoryRouter>
        <DodajPage />
      </MemoryRouter>
    )

    await screen.findByLabelText('Tytuł')

    await userEvent.type(screen.getByLabelText('Tytuł'), 'Nowe zdjęcie')
    await userEvent.selectOptions(screen.getByLabelText('Kategoria'), 'gory')
    await userEvent.type(
      screen.getByLabelText('Adres URL zdjęcia'),
      'https://przyklad.pl/zdjecie.jpg'
    )
    await userEvent.click(screen.getByRole('button', { name: 'Zapisz' }))

    expect(dodajZdjecie).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Nowe zdjęcie', category: 'gory' })
    )
    expect(navigateMock).toHaveBeenCalledWith('/')
  })
})