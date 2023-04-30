import connection from '../connection'
import db from '../transactions'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getTransactionByUserId', () => {
  it('should return transaction with a user id', async () => {
    const userId = 'google-oauth2|105121944184778286463'
    const transactions = await db.getTransactionsByUserId(userId)
    expect(transactions).toHaveLength(2)
    transactions.map((trans) => {
      expect(trans.userId).toBe(userId)
    })
  })
})

describe('addTransaction', () => {
  it('should add new transaction data', async () => {
    const transactionData = {
      transactionDate: '01/03/2023',
      payee: 'IRD',
      amount: 100.0,
      code: 'ird number',
      particular: 'test particular',
      reference: 'reference',
      categoryId: 4,
      note: 'this is a test note',
    }
    const userId = '2'

    const [addedPayee] = await db.addTransaction(userId, transactionData)

    expect(addedPayee).toMatchObject({ id: 4 })
  })
})

describe('updateTransaction', () => {
  it('should update selected transaction data with a transaction id', async () => {
    const transactionData = {
      transactionDate: '01/03/2023',
      payee: 'IRD',
      amount: 100.0,
      code: 'ird number',
      particular: 'test particular',
      reference: 'reference',
      categoryId: 4,
      note: 'this is a test note',
    }
    const tranId = 2
    const [updatedPayee] = await db.updateTransaction(tranId, transactionData)

    expect(updatedPayee).toMatchObject({ id: 2 })
  })
})

describe('deleteTransaction', () => {
  it('should delete transaction data with a transaction id', async () => {
    const transactionId = 1
    const deletedTransaction = await db.deleteTransaction(transactionId)
    expect(deletedTransaction).toBe(1)
  })
})
