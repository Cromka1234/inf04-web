
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer.jsx'

describe('Footer', () => {
  it('pokazuje nazwę projektu i informację o źródle zdjęć', () => {
    render(<Footer />)

    expect(screen.getByText(/Galeria Podróży/)).toBeInTheDocument()
    expect(screen.getByText(/picsum\.photos/)).toBeInTheDocument()
  })
})