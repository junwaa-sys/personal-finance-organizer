import request from 'superagent'
import * as models from '../../models/payees'

const rootUrl = '/api/v1/payees'

function getPayeesbyUserId(token: string): Promise<models.PayeeList[]> {
  return request
    .get(rootUrl + '/')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

function addPayee(payeeData: models.newPayee, token: string) {
  return request
    .post(rootUrl + '/add')
    .set('Authorization', `Bearer ${token}`)
    .send(payeeData)
}

function updatePayee(payeeId: number, payeeData: models.updatePayee) {
  return request.put(rootUrl + '/update/' + payeeId).send(payeeData)
}

function getPayeeByPayeeId(payeeId: number) {
  return request.get(rootUrl + '/' + payeeId).then((res) => {
    return res.body
  })
}

function deletePayee(payeeId: number) {
  return request.delete(rootUrl + '/delete/' + payeeId).then((res) => {
    return res.body
  })
}

export default {
  getPayeesbyUserId,
  addPayee,
  updatePayee,
  getPayeeByPayeeId,
  deletePayee,
}
