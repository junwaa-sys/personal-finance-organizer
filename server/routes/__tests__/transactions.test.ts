import request from 'supertest'
import server from '../../server'
import checkJwt, { JwtRequest } from '../../auth0'
import db from '../../db/transactions'
jest.mock('../../auth0')
jest.mock('../../db/transactions')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const transaction = {
  id: 2,
  transactionDate: '01/03/2023',
  payee: 'IRD',
  amount: 100.0,
  code: 'ird number',
  particular: 'test particular',
  reference: 'reference',
  userId: 'google-oauth2|105121944184778286463',
  categoryId: 4,
  note: 'this is a test note',
}

const newTransactionData = (auth0Id: string) => {
  return {
    id: 4,
    transaction_date: '01/03/2023',
    payee: 'IRD',
    amount: 100.0,
    code: 'ird number',
    particular: 'test particular',
    reference: 'reference',
    user_id: auth0Id,
    category_id: 4,
    note: 'this is a test note',
  }
}

async function mockJwt(auth0Id: string) {
  jest
    .mocked(checkJwt)
    .mockImplementation(async (req: JwtRequest, res, next) => {
      req.auth = {
        sub: auth0Id,
      }
      next()
    })
}

const auth0Id = 'auth0|123'

describe('GET /api/v1/transaction/', () => {
  it('should return payees', async () => {
    expect.assertions(1)
    await mockJwt(auth0Id)
    jest.mocked(db.getTransactionsByUserId).mockResolvedValue([transaction])
    const result = await request(server).get('/api/v1/transaction/')

    expect(result.body[0]).toMatchObject(transaction)
  })

  it('should return no auth0 ID error when not logged in', async () => {
    expect.assertions(2)
    await mockJwt('')

    jest.mocked(db.getTransactionsByUserId).mockResolvedValue([transaction])
    const result = await request(server).get('/api/v1/transaction/')

    expect(result.status).toBe(401)
    expect(result.text).toBe(
      'log in failed, please log in first to use service!'
    )
  })

  it('should return error message', async () => {
    expect.assertions(1)
    const errorMessage = 'test error message'
    await mockJwt(auth0Id)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.getTransactionsByUserId)
      .mockRejectedValue(new Error(errorMessage))

    const result = await request(server).get('/api/v1/transaction/')

    expect(result.text).toBe(errorMessage)
  })

  it('should return unknwon error message when error is not typeof Error', async () => {
    expect.assertions(2)
    const errorMessage = 'test error message'
    await mockJwt(auth0Id)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getTransactionsByUserId).mockRejectedValue(errorMessage)

    const result = await request(server).get('/api/v1/transaction/')
    const resultErrorMessage = JSON.parse(result.text)

    expect(result.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while getting transactions.'
    )
  })
})

describe('POST /api/v1/payees/transaction', () => {
  it('should return id, name after adding new transaction', async () => {
    expect.assertions(1)
    await mockJwt(auth0Id)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addTransaction).mockResolvedValue([{ id: 1 }])

    const response = await request(server).post('/api/v1/transaction/add')
    const result = JSON.parse(response.text)
    expect(result[0]).toMatchObject({ id: 1 })
  })

  it('should return 401 with no auth0 ID', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addTransaction).mockResolvedValue([{ id: 1 }])

    const response = await request(server).post('/api/v1/transaction/add')

    expect(response.status).toBe(401)
    expect(response.text).toBe(
      'log in failed, please log in first to use service!'
    )
  })

  it('should return error message', async () => {
    expect.assertions(1)
    await mockJwt(auth0Id)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.addTransaction)
      .mockRejectedValue(new Error('test error message'))

    const response = await request(server).post('/api/v1/transaction/add')

    expect(response.text).toBe('test error message')
  })

  it('should return unknown error message when error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt(auth0Id)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addTransaction).mockRejectedValue('test error message')

    const response = await request(server).post('/api/v1/transaction/add')
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while adding new transaction.'
    )
  })
})

describe('PUT /api/v1/transaction/update/1', () => {
  it('can update without auth0 ID', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.updateTransaction).mockResolvedValue([{ id: 1 }])

    const response = await request(server).put('/api/v1/transaction/update/1')
    const result = JSON.parse(response.text)

    expect(result[0]).toMatchObject({ id: 1 })
  })

  it('should return status 500 and set error message when error is type of Error', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.updateTransaction)
      .mockRejectedValue(new Error('test error message'))

    const response = await request(server).put('/api/v1/transaction/update/1')

    expect(response.text).toBe('test error message')
  })

  it('should return unknown error message if error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.updateTransaction).mockRejectedValue('test error message')

    const response = await request(server).put('/api/v1/transaction/update/1')
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while updating transaction.'
    )
  })
})

describe('DELETE /api/v1/transaction/delete/:id', () => {
  it('should delete payee without auth0ID', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.deleteTransaction).mockResolvedValue([{ id: 1 }])

    const response = await request(server).delete(
      '/api/v1/transaction/delete/1'
    )
    const result = JSON.parse(response.text)
    expect(result[0]).toMatchObject({ id: 1 })
  })
  it('should return status 500 and set error message when error is type of Error', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.deleteTransaction)
      .mockRejectedValue(new Error('test error message'))

    const response = await request(server).delete(
      '/api/v1/transaction/delete/1'
    )

    expect(response.text).toBe('test error message')
  })
  it('should return unknown error message if error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.deleteTransaction).mockRejectedValue('test error message')

    const response = await request(server).delete(
      '/api/v1/transaction/delete/1'
    )
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while deleting transaction.'
    )
  })
})
