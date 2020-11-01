import React from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '../redux/reducers/products'

const SortButtons = () => {
  // const sort = useSelector((store) => store.products.sort)
  const dispatch = useDispatch()
  return (
    <div>
      <button type="button" onClick={() => dispatch(setSort('price'))}>
        Sort by price
      </button>
      <button type="button" onClick={() => dispatch(setSort('title'))}>
        Sort by title
      </button>
    </div>
  )
}

SortButtons.propTypes = {}

export default SortButtons
