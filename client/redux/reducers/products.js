import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_RATES = 'SET_RATES'

const initialState = {
  listOfProducts: [],
  currentRates: {
    EUR: 1
  },
  currency: 'EUR'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        listOfProducts: action.list
      }
    case SET_RATES:
      return {
        ...state,
        currentRates: action.currentRates,
        currency: action.currency
      }
    default:
      return state
  }
}

export function setProducts() {
  return function (dispatch) {
    axios('/api/v1/products')
      .then((res) => res.data)
      .then((list) => {
        dispatch({ type: SET_PRODUCTS, list })
      })
  }
}

export function setRates(currency) {
  return function (dispatch, getState) {
    const state = getState()
    console.log(state)
    axios('/api/v1/exchange')
      .then((res) => res.data)
      .then((currentRates) => {
        dispatch({
          type: SET_RATES,
          currentRates,
          currency: currency.toUpperCase()
        })
      })
  }
}

  // rates: {
  //   USD: 1
  // },
  // currency: 'USD'

// case SET_CURRENCY: {
//       return {
//         ...state,
//         currency: action.data,
//         rates: action.rates
//       }
//     }

// /api/v1/exchange/:currency

// export function setCurrency(currency) {
//   return (dispatch, getState) => {
//     const state = getState()
//     console.log(state)
//     axios('https://api.exchangeratesapi.io/latest?base=USD').then(({ data }) => {
//       dispatch({
//         type: SET_CURRENCY,
//         data: currency.toUpperCase(),
//         rates: data.rates
//       })
//     })
//   }
// }