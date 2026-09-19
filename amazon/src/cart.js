// Prices are integer USD cents, avoiding floating-point accumulation in totals.
export function cartReducer(cart, action) {
  if (!action.productId) return cart
  const quantity = cart[action.productId] || 0
  if (action.type === 'add') {
    return { ...cart, [action.productId]: quantity + 1 }
  }
  if (action.type === 'remove' && quantity > 0) {
    const next = { ...cart }
    if (quantity === 1) delete next[action.productId]
    else next[action.productId] = quantity - 1
    return next
  }
  return cart
}

export function cartSummary(cart, products) {
  return products.reduce((summary, product) => {
    const quantity = cart[product.id] || 0
    return {
      count: summary.count + quantity,
      totalCents: summary.totalCents + quantity * product.priceCents,
    }
  }, { count: 0, totalCents: 0 })
}

export const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`
