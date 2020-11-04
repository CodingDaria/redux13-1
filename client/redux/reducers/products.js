import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_RATES = 'SET_RATES'
const SET_CART = 'SET_CART'
const PRODUCT_DECREASE = 'PRODUCT_DECREASE'
const SET_SORT = 'SET_SORT'
const SET_LOGS = 'SET_LOGS'

const initialState = {
  listOfProducts: [],
  currentRates: {
    EUR: 1
  },
  currency: 'EUR',
  cartProducts: [],
  sort: '',
  logs: []
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
    case SET_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.find((product) => product.id === action.product.id)
          ? state.cartProducts.map((product) => {
            if (product.id === action.product.id) {
              return {
                ...product,
                amount: product.amount + 1
              }
            }
            return product
          })
          : [...state.cartProducts, ...action.product]
      }
    case PRODUCT_DECREASE:
      return {
        ...state,
        cartProducts: state.cartProducts.reduce((acc, product) => {
          if (product.id === action.product.id) {
            if (product.amount === 1) {
              return acc
            }
            return [...acc, {
                ...product,
                amount: product.amount - 1
              }]
          }
          return [...acc, product]
        }, [])
      }
    case SET_SORT:
      if (action.sort === 'price') {
        return {
          ...state,
          listOfProducts: state.listOfProducts.sort((a, b) => b.price - a.price)
        }
      }
      if (action.sort === 'title') {
        return {
          ...state,
          listOfProducts: state.listOfProducts.sort((a, b) => a.title.localeCompare(b.title))
        }
      }
      return {
        ...state,
        sort: action.sort
      }
    case SET_LOGS:
      return {
        ...state,
        logs: action.logs
      }
    default:
      return state
  }
}

export function setProducts() {
  return (dispatch) => {
    axios('/api/v1/products')
      .then((res) => res.data)
      .then((list) => {
        dispatch({ type: SET_PRODUCTS, list })
      })
      .catch(() => {
        dispatch({ type: SET_PRODUCTS, list: [] })
      })
  }
}

export function setRates(currency) {
  return (dispatch, getState) => {
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

export function setCart(product) {
  return (dispatch) => {
    axios.post('/api/v1/logs', { logs: `${product.title} added to cart` })
    dispatch({
      type: SET_CART,
      product: { ...product, amount: 1 }
    })
  }
}

export function productDecrease(product) {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_DECREASE,
      product
    })
  }
}

export function setSort(sort) {
  return (dispatch) => {
    dispatch({
      type: SET_SORT,
      sort
    })
  }
}

export function setLogs() {
  return (dispatch) => {
    axios('/api/v1/logs')
      .then((res) => res.data)
      .then((logs) => {
        dispatch({ type: SET_LOGS, logs })
      })
      .catch(() => {
        dispatch({ type: SET_LOGS, logs: [] })
      })
  }
}

// axios.post('/api/v1/logs', { title: tasktitle }).then((it) => it.data)

// let cartProductsTmp = [ ...state.cartProducts ]
// let isProductInCart = false
// for (const product of state.cartProducts) {
//   if (product.id === action.product.id) {
//     cartProductsTmp.push({ ...product, amount: product.amount + 1 })
//     isProductInCart = true
//   }
//   cartProductsTmp.push(product)
// }
// if (!isProductInCart) {
//   cartProductsTmp = [ ...state.cartProducts, ...action.product ]
// }
// return {
//   ...state,
//   cartProducts: cartProductsTmp
// }
