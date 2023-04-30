import * as models from '../../models/transactions'
import {
  GetTransactionsAction,
  REQUEST_TRANSACTION_LIST,
  RECEIVE_TRANSACTION_LIST,
  FAILURE_TRANSACTION_LIST,
} from '../actions/getTransactions'

interface GetTransactionState {
  data: models.Transactions[] | null
  error: string | null
  loading: boolean
}

const initialState: GetTransactionState = {
  data: null,
  error: null,
  loading: false,
}

function getTransactionReducer(
  state = initialState,
  action: GetTransactionsAction
): GetTransactionState {
  switch (action.type) {
    case REQUEST_TRANSACTION_LIST:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case RECEIVE_TRANSACTION_LIST:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_TRANSACTION_LIST:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default getTransactionReducer
