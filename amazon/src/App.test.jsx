import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { cartReducer, cartSummary } from './cart'

describe('catalog and cart', () => {
  it('searches case-insensitively by category and exposes empty results', () => {
    render(<App />)
    const search = screen.getByRole('searchbox', { name: 'Search products' })
    fireEvent.change(search, { target: { value: '  AUDIO  ' } })
    expect(screen.getByRole('heading', { name: 'Noise Cancelling Headphones' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Mechanical Keyboard' })).not.toBeInTheDocument()
    fireEvent.change(search, { target: { value: 'unavailable' } })
    expect(screen.getByText('No products match your search.')).toBeInTheDocument()
  })

  it('adds duplicate items, retains them across searches, and removes one at a time', () => {
    render(<App />)
    const add = screen.getByRole('button', { name: 'Add Mechanical Keyboard to cart' })
    fireEvent.click(add)
    fireEvent.click(add)
    expect(screen.getByRole('status')).toHaveTextContent('2 items · $179.98')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Audio' } })
    expect(screen.getByRole('status')).toHaveTextContent('2 items · $179.98')
    const cart = within(screen.getByRole('region', { name: 'Your cart' }))
    fireEvent.click(cart.getByRole('button', { name: 'Remove one Mechanical Keyboard' }))
    expect(screen.getByRole('status')).toHaveTextContent('1 items · $89.99')
    fireEvent.click(cart.getByRole('button', { name: 'Remove one Mechanical Keyboard' }))
    expect(cart.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('0 items · $0.00')
  })

  it('preserves previous reducer state and calculates exact integer-cent totals', () => {
    const original = Object.freeze({ a: 1 })
    const added = cartReducer(original, { type: 'add', productId: 'a' })
    expect(original).toEqual({ a: 1 })
    expect(cartSummary(added, [{ id: 'a', priceCents: 10 }])).toEqual({ count: 2, totalCents: 20 })
    expect(cartReducer({}, { type: 'remove', productId: 'a' })).toEqual({})
    expect(cartReducer(original, { type: 'unknown', productId: 'a' })).toBe(original)
  })
})
