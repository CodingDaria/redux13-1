import React from 'react'
import { useSelector } from 'react-redux'

const Cartitem = (props) => {
  const { product } = props
  const currency = useSelector((store) => store.products.currency)
  const currentRate = useSelector((store) => store.products.currentRates[currency])
  const price = currency === 'EUR' ? product.price : product.price * currentRate
  const totalSum = product.amount * price
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="product__title">
          {product.title}
        </div>
        <img
          className="product__image"
          src={product.image}
          alt={product.description} />
        <div className="product__price">{price.toFixed(2)} {currency}</div>
        <div className="product__amount">in cart: {product.amount}</div>
        <div className="product__total_price">Total sum: {totalSum.toFixed(2)} {currency}</div>
      </div>
    </div>
  )
}

Cartitem.propTypes = {}

export default Cartitem
