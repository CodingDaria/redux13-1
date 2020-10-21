import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

const initialState = {
  listOfProducts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        listOfProducts: action.list
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