import * as models from '../../models/transactions'
import { ThunkAction } from '../store'
import apis from '../apis/transactions'

export const REQUEST_ADD_TRANSACTION = 'REQUEST_ADD_TRANSACTION'
export const FULLFILLED_ADD_TRANSACTION = 'FULLFILLED_ADD_TRANSACTION'
export const FAILURE_ADD_TRANSACTION = 'FAILURE_ADD_TRANSACTION'

export type AddTransactionAction =
  | { type: typeof REQUEST_ADD_TRANSACTION; payload: void }
  | { type: typeof FULLFILLED_ADD_TRANSACTION; payload: string[] }
  | { type: typeof FAILURE_ADD_TRANSACTION; payload: string }

export function requestAddTransaction(): AddTransactionAction {
  return {
    type: REQUEST_ADD_TRANSACTION,
  } as AddTransactionAction
}

export function fullfilledAddTransaction(
  addedTransaction: string[]
): AddTransactionAction {
  return {
    type: FULLFILLED_ADD_TRANSACTION,
    payload: addedTransaction,
  }
}

export function failureAddTransaction(error: string): AddTransactionAction {
  return {
    type: FAILURE_ADD_TRANSACTION,
    payload: error,
  }
}

export function addTransaction(
  token: string,
  transactionData: models.NewTransaction
): ThunkAction {
  return (dispatch) => {
    dispatch(requestAddTransaction())
    return apis
      .addTransaction(transactionData, token)
      .then((res) => {
        dispatch(fullfilledAddTransaction(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failureAddTransaction(error.message))
        } else {
          dispatch(failureAddTransaction('An unkwon error occured'))
        }
      })
  }
}
