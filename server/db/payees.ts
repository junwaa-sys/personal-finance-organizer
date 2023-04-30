import connection from './connection'
import * as models from '../../models/payees'

function getPayeesByUserId(
  userId: string,
  db = connection
): Promise<models.PayeeList[]> {
  return db('payees')
    .select(
      'id',
      'name',
      'bank_account as bankAccount',
      'bank_name as bankName',
      'description',
      'contact',
      'user_id as userId'
    )
    .where('user_id', userId)
}

function getPayeesByPayeeId(
  payeeId: number,
  db = connection
): Promise<models.PayeeList[]> {
  return db('payees')
    .select(
      'id',
      'name',
      'bank_account as bankAccount',
      'bank_name as bankName',
      'description',
      'contact',
      'user_id as userId'
    )
    .where('id', payeeId)
    .first()
}

function addPayee(userId: string, payeeData: models.newPayee, db = connection) {
  return db('payees')
    .insert({
      name: payeeData.name,
      bank_name: payeeData.bankName,
      bank_account: payeeData.bankAccount,
      description: payeeData.description,
      contact: payeeData.contact,
      user_id: userId,
    })
    .returning(['id', 'name'])
}

function updatePayee(
  payeeId: number,
  payeeData: models.updatePayee,
  db = connection
) {
  return db('payees')
    .update({
      name: payeeData.name,
      bank_name: payeeData.bankName,
      bank_account: payeeData.bankAccount,
      description: payeeData.description,
      contact: payeeData.contact,
    })
    .where('id', payeeId)
    .returning(['id', 'name'])
}

function deletePayee(payeeId: number, db = connection) {
  return db('payees').delete().where('id', payeeId)
}

export default {
  getPayeesByUserId,
  addPayee,
  updatePayee,
  deletePayee,
  getPayeesByPayeeId,
}
