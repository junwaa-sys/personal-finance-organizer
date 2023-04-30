import {
  AddPayeeAction,
  REQUEST_ADD_PAYEE,
  FULLILLED_ADD_PAYEE,
  FAILURE_ADD_PAYEE,
} from '../actions/addPayee'

interface AddPayeeState {
  data: string[] | null
  error: string | null
  loading: boolean
}

const initialState: AddPayeeState = {
  data: null,
  error: null,
  loading: false,
}

function addPayeeReducer(state = initialState, action: AddPayeeAction) {
  switch (action.type) {
    case REQUEST_ADD_PAYEE:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FULLILLED_ADD_PAYEE:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_ADD_PAYEE:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default addPayeeReducer
