import * as models from '../../models/transactions'
import { ThunkAction } from '../store'
import apis from '../apis/transactions'

export const REQUEST_TRANSACTION_LIST = 'REQUEST_TRANSACTION_LIST'
export const RECEIVE_TRANSACTION_LIST = 'RECEIVE_TRANSACTION_LIST'
export const FAILURE_TRANSACTION_LIST = 'FAILURE_TRANSACTION_LIST'

export type GetTransactionsAction =
  | { type: typeof REQUEST_TRANSACTION_LIST; payload: void }
  | { type: typeof RECEIVE_TRANSACTION_LIST; payload: models.Transactions[] }
  | { type: typeof FAILURE_TRANSACTION_LIST; payload: string }

export function requestGetTransactions(): GetTransactionsAction {
  return {
    type: REQUEST_TRANSACTION_LIST,
  } as GetTransactionsAction
}

export function receiveGetTransactions(
  transactions: models.Transactions[]
): GetTransactionsAction {
  return {
    type: RECEIVE_TRANSACTION_LIST,
    payload: transactions,
  }
}

export function failureGetTransactions(error: string): GetTransactionsAction {
  return {
    type: FAILURE_TRANSACTION_LIST,
    payload: error,
  }
}

export function getTransactions(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestGetTransactions())
    return apis
      .getTransactionsByUserId(token)
      .then((res) => {
        dispatch(receiveGetTransactions(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failureGetTransactions(error.message))
        } else {
          dispatch(failureGetTransactions('An unkwon error occured'))
        }
      })
  }
}
