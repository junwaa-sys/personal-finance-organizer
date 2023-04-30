import request from 'superagent'
import * as models from '../../models/transactions'

const rootUrl = '/api/v1/transaction'

function getTransactionsByUserId(
  token: string
): Promise<models.Transactions[]> {
  return request
    .get(rootUrl + '/')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

function addTransaction(transactionData: models.NewTransaction, token: string) {
  return request
    .post(rootUrl + '/add')
    .set('Authorization', `Beare ${token}`)
    .send(transactionData)
    .then((res) => {
      return res.body
    })
}

function updateTransaction(
  transactionData: models.UpdateTransaction,
  transId: number
) {
  return request
    .put(rootUrl + '/update/' + transId)
    .send(transactionData)
    .then((res) => {
      return res.body
    })
}

function deleteTransaction(transId: number) {
  return request.delete(rootUrl + '/delete/' + transId).then((res) => {
    return res.body
  })
}

export default {
  getTransactionsByUserId,
  addTransaction,
  updateTransaction,
  deleteTransaction,
}
