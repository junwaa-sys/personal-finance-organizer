import apis from '../apis/payees'
import { ThunkAction } from '../store'

export const REQUEST_DELETE_PAYEE = 'REQUEST_DELETE_PAYEE'
export const FULLFILLED_DELETE_PAYEE = 'FULLILLED_DELETE_PAYEE'
export const FAILURE_DELETE_PAYEE = 'FAILURE_DELETE_PAYEE'

export type DeletePayeeAction =
  | { type: typeof REQUEST_DELETE_PAYEE; payload: void }
  | { type: typeof FULLFILLED_DELETE_PAYEE; payload: string[] }
  | { type: typeof FAILURE_DELETE_PAYEE; payload: string }

export function requestDeletePayee(): DeletePayeeAction {
  return {
    type: REQUEST_DELETE_PAYEE,
  } as DeletePayeeAction
}

export function fullfilledDeletePayee(
  deletedPayee: string[]
): DeletePayeeAction {
  return {
    type: FULLFILLED_DELETE_PAYEE,
    payload: deletedPayee,
  }
}

export function failureDeletePayee(error: string) {
  return {
    type: FAILURE_DELETE_PAYEE,
    payload: error,
  }
}

export function deletePayee(payeeId: number): ThunkAction {
  return (dispatch) => {
    dispatch(requestDeletePayee())
    return apis
      .deletePayee(payeeId)
      .then((res) => {
        dispatch(fullfilledDeletePayee(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failureDeletePayee(error.message))
        } else {
          dispatch(failureDeletePayee('An unknown error occured'))
        }
      })
  }
}
