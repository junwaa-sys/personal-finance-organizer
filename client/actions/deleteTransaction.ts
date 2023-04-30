import api from '../apis/transactions'
import { ThunkAction } from '../store'

export const REQUEST_DELETE_TRANSACTION = 'REQUEST_DELETE_TRANSACTION'
export const FULLFILLED_DELETE_TRANSACTION = 'FULLILLED_DELETE_TRANSACTION'
export const FAILURE_DELETE_TRANSACTION = 'FAILURE_DELETE_TRANSACTION'

export type DeleteTransactionAction =
  | { type: typeof REQUEST_DELETE_TRANSACTION; payload: void }
  | { type: typeof FULLFILLED_DELETE_TRANSACTION; payload: string[] }
  | { type: typeof FAILURE_DELETE_TRANSACTION; payload: string }

export function reqeustDeleteTransaction(): DeleteTransactionAction {
  return {
    type: REQUEST_DELETE_TRANSACTION,
  } as DeleteTransactionAction
}

export function fullfilledDeleteTransaction(
  deletedTransaction: string[]
): DeleteTransactionAction {
  return {
    type: FULLFILLED_DELETE_TRANSACTION,
    payload: deletedTransaction,
  }
}

export function failureDeleteTransaction(
  error: string
): DeleteTransactionAction {
  return {
    type: FAILURE_DELETE_TRANSACTION,
    payload: error,
  }
}

export function deleteTransaction(transId: number): ThunkAction {
  return (dispatch) => {
    dispatch(reqeustDeleteTransaction())
    return api
      .deleteTransaction(transId)
      .then((res) => {
        dispatch(fullfilledDeleteTransaction(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failureDeleteTransaction(error.message))
        } else {
          dispatch(failureDeleteTransaction('An unknown error occured'))
        }
      })
  }
}
