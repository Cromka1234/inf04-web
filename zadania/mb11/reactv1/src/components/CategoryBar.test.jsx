
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CategoryBar from './CategoryBar.jsx'

describe('CategoryBar', () => {
  it('wywołuje onWybierz z poprawną kategorią po kliknięciu', async () => {
    const onWybierz = vi.fn()
    render(<CategoryBar aktywna="wszystkie" onWybierz={onWybierz} />)

    await userEvent.click(screen.getByRole('button', { name: 'Góry' }))

    expect(onWybierz).toHaveBeenCalledWith('gory')
  })
})