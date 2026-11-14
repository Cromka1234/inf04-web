
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CategoryBar from './CategoryBar.jsx'

describe('CategoryBar', () => {
  it('oznacza aktywną kategorię przez aria-pressed', () => {
    render(<CategoryBar aktywna="gory" onWybierz={() => {}} />)

    expect(screen.getByRole('button', { name: 'Góry' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Morze' })).toHaveAttribute('aria-pressed', 'false')
  })
})