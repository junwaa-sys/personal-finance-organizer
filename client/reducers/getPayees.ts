import * as models from '../../models/payees'
import {
  GetPayeesListAction,
  REQUEST_PAYEES_LIST,
  RECEIVE_PAYEES_LIST,
  FAILURE_PAYEES_LIST,
} from '../actions/getPayees'

interface GetPayeesListState {
  data: models.PayeeList[] | null
  error: string | null
  loading: boolean
}

const initialState: GetPayeesListState = {
  data: null,
  error: null,
  loading: false,
}

function getPayeesListReducer(
  state = initialState,
  action: GetPayeesListAction
): GetPayeesListState {
  switch (action.type) {
    case REQUEST_PAYEES_LIST:
      return {
        data: null,
        error: null,
        loading: true,
      }
    case RECEIVE_PAYEES_LIST:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }
    case FAILURE_PAYEES_LIST:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default getPayeesListReducer
