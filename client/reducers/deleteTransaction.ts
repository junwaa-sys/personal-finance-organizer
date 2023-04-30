import {
  DeleteTransactionAction,
  REQUEST_DELETE_TRANSACTION,
  FULLFILLED_DELETE_TRANSACTION,
  FAILURE_DELETE_TRANSACTION,
} from '../actions/deleteTransaction'

interface DeleteTransactionState {
  data: string[] | null
  error: string | null
  loading: boolean
}

const initialState: DeleteTransactionState = {
  data: null,
  error: null,
  loading: false,
}

function deleteTransactionReducer(
  state = initialState,
  action: DeleteTransactionAction
): DeleteTransactionState {
  switch (action.type) {
    case REQUEST_DELETE_TRANSACTION:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FULLFILLED_DELETE_TRANSACTION:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_DELETE_TRANSACTION:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default deleteTransactionReducer
