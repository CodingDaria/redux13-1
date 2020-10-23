import React from 'react'
import { useDispatch } from 'react-redux'
import { setRates } from '../redux/reducers/products'

const CurrButtons = () => {
  const dispatch = useDispatch()
  const onClickFunc = (currency) => {
    dispatch(setRates(currency))
  }
  return (
    <div>
      <button type="button" onClick={() => onClickFunc('EUR')}>
        EUR
      </button>
      <button type="button" onClick={() => onClickFunc('USD')}>
        USD
      </button>
      <button type="button" onClick={() => onClickFunc('CAD')}>
        CAD
      </button>
    </div>
  )
}

CurrButtons.propTypes = {}

export default CurrButtons
