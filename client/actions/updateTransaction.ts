import * as models from '../../models/transactions'
import api from '../apis/transactions'
import type { ThunkAction } from '../store'

export const REQUEST_UPDATE_TRANSACTION = 'REQUEST_UPDATE_TRANSACTION'
export const FULLFILLED_UPDATE_TRANSACTION = 'FULLFILLED_UPDATE_TRANSACTION'
export const FAILURE_UPDATE_TRANSACTION = 'FAILURE_UPDATE_TRANSACTION'

export type UpdateTransactionAction =
  | { type: typeof REQUEST_UPDATE_TRANSACTION; payload: void }
  | { type: typeof FULLFILLED_UPDATE_TRANSACTION; payload: string[] }
  | { type: typeof FAILURE_UPDATE_TRANSACTION; payload: string }

export function requestUpdateTransaction(): UpdateTransactionAction {
  return {
    type: REQUEST_UPDATE_TRANSACTION,
  } as UpdateTransactionAction
}

export function fullfilledUpdateTransaction(
  updatedTrnasaction: string[]
): UpdateTransactionAction {
  return {
    type: FULLFILLED_UPDATE_TRANSACTION,
    payload: updatedTrnasaction,
  }
}

export function failureUPdateTransaction(
  error: string
): UpdateTransactionAction {
  return {
    type: FAILURE_UPDATE_TRANSACTION,
    payload: error,
  }
}

export function updateTransaction(
  transId: number,
  trnasactionData: models.UpdateTransaction
): ThunkAction {
  return (dispatch) => {
    dispatch(requestUpdateTransaction())
    return api
      .updateTransaction(trnasactionData, transId)
      .then((res) => {
        dispatch(fullfilledUpdateTransaction(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failureUPdateTransaction(error.message))
        } else {
          dispatch(failureUPdateTransaction('An unkwon error occured'))
        }
      })
  }
}
