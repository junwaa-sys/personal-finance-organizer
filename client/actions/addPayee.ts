import * as models from '../../models/payees'
import apis from '../apis/payees'
import type { ThunkAction } from '../store'

export const REQUEST_ADD_PAYEE = 'REQUEST_ADD_PAYEE'
export const FULLILLED_ADD_PAYEE = 'FULLILLED_ADD_PAYEE'
export const FAILURE_ADD_PAYEE = 'FAILURE_ADD_PAYEE'

export type AddPayeeAction =
  | { type: typeof REQUEST_ADD_PAYEE; payload: void }
  | { type: typeof FULLILLED_ADD_PAYEE; payload: string[] }
  | { type: typeof FAILURE_ADD_PAYEE; payload: string }

export function requestAddPayee(): AddPayeeAction {
  return { type: REQUEST_ADD_PAYEE } as AddPayeeAction
}

export function fullFilledAddPayee(addedPayee: string[]): AddPayeeAction {
  return {
    type: FULLILLED_ADD_PAYEE,
    payload: addedPayee,
  }
}

export function failureAddPayee(error: string) {
  return {
    type: FAILURE_ADD_PAYEE,
    payload: error,
  }
}

export function addPayee(
  token: string,
  payeeData: models.newPayee
): ThunkAction {
  return (dispatch) => {
    dispatch(requestAddPayee())
    return apis
      .addPayee(payeeData, token)
      .then((res) => {
        dispatch(fullFilledAddPayee(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failureAddPayee(error.message))
        } else {
          dispatch(failureAddPayee('An unkwon error occured'))
        }
      })
  }
}
