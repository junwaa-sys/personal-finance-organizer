import connection from './connection'
import * as models from '../../models/transactions'
import DashBoard from '../../client/components/DashBoard'

function getTransactionsByUserId(
  userId: string,
  db = connection
): Promise<models.Transactions[]> {
  return db('transactions')
    .select(
      'id',
      'transaction_date as transactionDate',
      'payee',
      'amount',
      'code',
      'particular',
      'reference',
      'user_id as userId',
      'category_id as categoryId',
      'note'
    )
    .where('user_id', userId)
}

function addTransaction(
  userId: string,
  transactionData: models.NewTransaction,
  db = connection
) {
  return db('transactions')
    .insert({
      transaction_date: transactionData.transactionDate,
      payee: transactionData.payee,
      amount: transactionData.amount,
      code: transactionData.code,
      particular: transactionData.particular,
      reference: transactionData.reference,
      user_id: userId,
      category_id: transactionData.categoryId,
      note: transactionData.note,
    })
    .returning(['id'])
}

function updateTransaction(
  transactionId: number,
  transactionData: models.UpdateTransaction,
  db = connection
) {
  return db('transactions')
    .update({
      transaction_date: transactionData.transactionDate,
      payee: transactionData.payee,
      amount: transactionData.amount,
      code: transactionData.code,
      particular: transactionData.particular,
      reference: transactionData.reference,
      category_id: transactionData.categoryId,
      note: transactionData.note,
    })
    .where('id', transactionId)
    .returning(['id'])
}

function deleteTransaction(transactionId: number, db = connection) {
  return db('transactions')
    .delete()
    .where('id', transactionId)
    .returning(['id'])
}

export default {
  getTransactionsByUserId,
  addTransaction,
  updateTransaction,
  deleteTransaction,
}
