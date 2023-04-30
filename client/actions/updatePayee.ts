import * as models from '../../models/payees'
import apis from '../apis/payees'
import { ThunkAction } from '../store'

export const REQUEST_UPDATE_PAYEE = 'REQUEST_UPDATE_PAYEE'
export const FULLILLED_UPDATE_PAYEE = 'FULLILLED_UPDATE_PAYEE'
export const FAILURE_UPDATE_PAYEE = 'FAILURE_UPDATE_PAYEE'

export type UpdatePayeeAction =
  | { type: typeof REQUEST_UPDATE_PAYEE; payload: void }
  | { type: typeof FULLILLED_UPDATE_PAYEE; payload: string[] }
  | { type: typeof FAILURE_UPDATE_PAYEE; payload: string }

export function requestUpdatePayee(): UpdatePayeeAction {
  return { type: REQUEST_UPDATE_PAYEE } as UpdatePayeeAction
}

export function fullFilledUpdatePayee(
  updatedPayee: string[]
): UpdatePayeeAction {
  return {
    type: FULLILLED_UPDATE_PAYEE,
    payload: updatedPayee,
  }
}

export function failuerUpdatePayee(error: string): UpdatePayeeAction {
  return {
    type: FAILURE_UPDATE_PAYEE,
    payload: error,
  }
}

export function updatePayee(
  payeeId: number,
  payeeData: models.updatePayee
): ThunkAction {
  return (dispatch) => {
    dispatch(requestUpdatePayee())
    return apis
      .updatePayee(payeeId, payeeData)
      .then((res) => {
        dispatch(fullFilledUpdatePayee(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failuerUpdatePayee(error.message))
        } else {
          dispatch(failuerUpdatePayee('An unkown error occured'))
        }
      })
  }
}
