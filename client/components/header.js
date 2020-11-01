import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CurrButtons from './currbuttons'
import SortButtons from './sortbuttons'
import OrderCount from './ordercount'

const Header = () => {
  const cartProducts = useSelector((store) => store.products.cartProducts)
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-400 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6" id="brand-name">
        <Link to="/">Pepe Shop</Link>
      </div>
      <Link to="/logs">Logs</Link>
      <CurrButtons />
      <SortButtons />
      <OrderCount cartProducts={cartProducts} />
    </nav>
  )
}

Header.propTypes = {}

export default Header
