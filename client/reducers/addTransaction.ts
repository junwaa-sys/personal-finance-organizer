import {
  AddTransactionAction,
  REQUEST_ADD_TRANSACTION,
  FULLFILLED_ADD_TRANSACTION,
  FAILURE_ADD_TRANSACTION,
} from '../actions/addTransaction'

interface AddTransactionState {
  data: string[] | null
  error: string | null
  loading: boolean
}

const initialState: AddTransactionState = {
  data: null,
  error: null,
  loading: false,
}

function addTransactionReducer(
  state = initialState,
  action: AddTransactionAction
): AddTransactionState {
  switch (action.type) {
    case REQUEST_ADD_TRANSACTION:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FULLFILLED_ADD_TRANSACTION:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_ADD_TRANSACTION:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default addTransactionReducer
