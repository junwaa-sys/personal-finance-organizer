import * as models from '../../models/payees'
import api from '../apis/payees'
import type { ThunkAction } from '../store'

export const REQUEST_PAYEES_LIST = 'REQUEST_PAYEES_LIST'
export const RECEIVE_PAYEES_LIST = 'RECEIVE_PAYEES_LIST'
export const FAILURE_PAYEES_LIST = 'FAILURE_PAYEES_LIST'

export type GetPayeesListAction =
  | { type: typeof REQUEST_PAYEES_LIST; payload: void }
  | { type: typeof RECEIVE_PAYEES_LIST; payload: models.PayeeList[] }
  | { type: typeof FAILURE_PAYEES_LIST; payload: string }

export function reqeustPayeesList(): GetPayeesListAction {
  return { type: REQUEST_PAYEES_LIST } as GetPayeesListAction
}

export function receivePayeesList(
  payeesList: models.PayeeList[]
): GetPayeesListAction {
  return {
    type: RECEIVE_PAYEES_LIST,
    payload: payeesList,
  }
}

export function failurePayeesList(error: string): GetPayeesListAction {
  return {
    type: FAILURE_PAYEES_LIST,
    payload: error,
  }
}

export function getPayeesList(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(reqeustPayeesList())
    return api
      .getPayeesbyUserId(token)
      .then((res) => {
        dispatch(receivePayeesList(res))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(failurePayeesList(error.message))
        } else {
          dispatch(failurePayeesList('An unkwon error occured'))
        }
      })
  }
}
