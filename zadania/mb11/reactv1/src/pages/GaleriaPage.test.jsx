
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import GaleriaPage from './GaleriaPage.jsx'

vi.mock('../services/zdjecia.js', () => ({
  pobierzZdjecia: () => Promise.reject(new Error('Brak sieci')),
}))

describe('GaleriaPage', () => {
  it('pokazuje komunikat błędu zamiast pustej strony', async () => {
    render(<GaleriaPage />)

    expect(await screen.findByText(/Nie udało się pobrać danych/)).toBeInTheDocument()
  })
})