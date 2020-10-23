import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from './card'
import { setProducts } from '../redux/reducers/products'

const Shop = () => {
  const products = useSelector((store) => store.products.listOfProducts.slice(0, 10))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setProducts())
    return () => {}
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      {/* className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10" */}
      <div className="flex flex-wrap">
        {products.map((product) => {
          return (
            <div key={product.id} className="m-2">
              <Card product={product} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

Shop.propTypes = {}

export default Shop
