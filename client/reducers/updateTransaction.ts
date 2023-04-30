import {
  UpdateTransactionAction,
  REQUEST_UPDATE_TRANSACTION,
  FULLFILLED_UPDATE_TRANSACTION,
  FAILURE_UPDATE_TRANSACTION,
} from '../actions/updateTransaction'

interface UpdateTransactionState {
  data: string[] | null
  error: string | null
  loading: boolean
}

const initialState: UpdateTransactionState = {
  data: null,
  error: null,
  loading: false,
}

function updateTransactionReducer(
  state = initialState,
  action: UpdateTransactionAction
): UpdateTransactionState {
  switch (action.type) {
    case REQUEST_UPDATE_TRANSACTION:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FULLFILLED_UPDATE_TRANSACTION:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }
    case FAILURE_UPDATE_TRANSACTION:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default updateTransactionReducer
