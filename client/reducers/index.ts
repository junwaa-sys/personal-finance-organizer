import { combineReducers } from 'redux'

import fruits from './fruits'
import getPayeesListReducer from './getPayees'
import addPayeeReducer from './addPayee'
import updatePayeeReducer from './updatePayee'
import deletePayeeReducer from './deletePayee'
import getTransactionReducer from './getTransactions'
import addTransactionReducer from './addTransaction'
import updateTransactionReducer from './updateTransaction'
import deleteTransactionReducer from './deleteTransaction'

export default combineReducers({
  fruits: fruits,
  getPayees: getPayeesListReducer,
  addPayee: addPayeeReducer,
  updatePayee: updatePayeeReducer,
  deletePayee: deletePayeeReducer,
  getTransactions: getTransactionReducer,
  addTransacion: addTransactionReducer,
  updateTransaction: updateTransactionReducer,
  deleteTransaction: deleteTransactionReducer,
})
