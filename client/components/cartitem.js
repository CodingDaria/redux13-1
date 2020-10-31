import React from 'react'
import { useDispatch } from 'react-redux'
import { setCart, productDecrease } from '../redux/reducers/products'

const Cartitem = (props) => {
  const { product, currency, currentRate } = props
  const price = currency === 'EUR' ? product.price : product.price * currentRate
  const totalSum = product.amount * price
  const dispatch = useDispatch()
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="product__title">{product.title}</div>
        <img className="product__image" src={product.image} alt={product.description} />
        <div className="product__price">
          {price.toFixed(2)} {currency}
        </div>
        <div>
          <button type="button" onClick={() => dispatch(productDecrease(product))}>
            -
          </button>
          <div className="product__amount">in cart: {product.amount}</div>
          <button type="button" onClick={() => dispatch(setCart(product))}>
            +
          </button>
        </div>
        <div className="product__total_price">
          Total sum: {totalSum.toFixed(2)} {currency}
        </div>
      </div>
    </div>
  )
}

Cartitem.propTypes = {}

export default Cartitem
