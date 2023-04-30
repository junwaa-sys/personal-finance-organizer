import {
  DeletePayeeAction,
  REQUEST_DELETE_PAYEE,
  FULLFILLED_DELETE_PAYEE,
  FAILURE_DELETE_PAYEE,
} from '../actions/deletePayee'

interface DeletePayeeState {
  data: string[] | null
  error: string | null
  loading: boolean
}

const initialState: DeletePayeeState = {
  data: null,
  error: null,
  loading: false,
}

function deletePayeeReducer(state = initialState, action: DeletePayeeAction) {
  switch (action.type) {
    case REQUEST_DELETE_PAYEE:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FULLFILLED_DELETE_PAYEE:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_DELETE_PAYEE:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default deletePayeeReducer
