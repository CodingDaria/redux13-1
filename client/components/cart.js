import React from 'react'
import { useSelector } from 'react-redux'
import Cartitem from './cartitem'

const Cart = () => {
  const cartProducts = useSelector((store) => store.products.cartProducts)
  const currency = useSelector((store) => store.products.currency)
  const currentRate = useSelector((store) => store.products.currentRates[currency])
  const totalPrice =
    currency === 'EUR'
      ? cartProducts.reduce((acc, rec) => acc + rec.price * rec.amount, 0)
      : cartProducts.reduce((acc, rec) => acc + rec.price * rec.amount, 0) * currentRate
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold p-10">
          {cartProducts.map((product) => {
            return (
              <div key={product.id}>
                <Cartitem product={product} currency={currency} currentRate={currentRate} />
              </div>
            )
          })}
        </div>
        <div id="total-amount">
          Total amount: {cartProducts.reduce((acc, rec) => acc + rec.amount, 0)}
        </div>
        <div id="total-price">
          Total price: {totalPrice.toFixed(2)} {currency}
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {}

export default Cart
