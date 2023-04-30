import {
  UpdatePayeeAction,
  REQUEST_UPDATE_PAYEE,
  FULLILLED_UPDATE_PAYEE,
  FAILURE_UPDATE_PAYEE,
} from '../actions/updatePayee'

interface UpdatePayeeState {
  data: string[] | null
  error: string | null
  loading: boolean
}

const initialState: UpdatePayeeState = {
  data: null,
  error: null,
  loading: false,
}

function updatePayeeReducer(state = initialState, action: UpdatePayeeAction) {
  switch (action.type) {
    case REQUEST_UPDATE_PAYEE:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FULLILLED_UPDATE_PAYEE:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }

    case FAILURE_UPDATE_PAYEE:
      return {
        data: null,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default updatePayeeReducer
