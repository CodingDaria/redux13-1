import axios from 'axios'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = { location: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      axios.post('/api/v1/logs', { logs: `navigated to ${action.payload.location.pathname}` })
      console.log(action)
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}
