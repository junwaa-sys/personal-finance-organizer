import connection from '../connection'
import db from '../payees'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getPayeesByUserID', () => {
  it('should return payees with a user id', async () => {
    const userId = 'google-oauth2|105121944184778286463'
    const payeesList = await db.getPayeesByUserId(userId)
    expect(payeesList).toHaveLength(2)
    payeesList.map((payee) => {
      expect(payee.userId).toBe(userId)
    })
  })
})

describe('addPayee', () => {
  it('should add new payee data', async () => {
    const payeeData = {
      name: 'test name',
      bankName: 'BNZ',
      bankAccount: '02-0000-0000000-000',
      description: 'test description',
      contact: 'ak@auckland.org.nz',
    }
    const userId = '2'

    const [addedPayee] = await db.addPayee(userId, payeeData)

    expect(addedPayee).toMatchObject({ id: 4, name: 'test name' })
  })
})

describe('updatePayee', () => {
  it('should update selected payee data with a payee id', async () => {
    const payeeData = {
      name: 'test name',
      bankName: 'test bank name',
      bankAccount: '11-1111-11111111-111',
      description: 'test desc',
      contact: 'test contact',
    }
    const payeeId = 2
    const [updatedPayee] = await db.updatePayee(payeeId, payeeData)
    const updatedPayeeData = await db.getPayeesByPayeeId(payeeId)

    expect(updatedPayee).toMatchObject({ id: 2, name: 'test name' })
    expect(updatedPayeeData).toMatchObject({
      ...payeeData,
      userId: 'google-oauth2|105121944184778286463',
    })
  })
})

describe('deletePayee', () => {
  it('should delete payee data with a payee id', async () => {
    const payeeId = 1
    const userId = 'google-oauth2|105121944184778286463'
    const deletedPayee = await db.deletePayee(payeeId)

    const payeeData = await db.getPayeesByUserId(userId)
    const payeeDataAfterDel = await db.getPayeesByPayeeId(payeeId)

    expect(deletedPayee).toBe(1)
    //in seed there are 2 payee data with userId 1, payee data with payeeId =1 has userId =1, therefore after delete, payeeData with userId='1' should return only one data
    expect(payeeData).toHaveLength(1)
    expect(payeeDataAfterDel).toBeUndefined()
  })
})
