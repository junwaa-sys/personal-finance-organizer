import request from 'supertest'
import server from '../../server'
import checkJwt, { JwtRequest } from '../../auth0'
import db from '../../db/payees'
jest.mock('../../auth0')
jest.mock('../../db/payees')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

const payeeList = {
  id: 1,
  name: 'test name',
  bankName: 'test bank',
  bankAccount: '11-1111-1111111-111',
  description: 'test description',
  contact: 'test contact',
  userId: 'testUser',
}

const newPayeeData = (auth0Id: string) => {
  return {
    name: 'test name',
    bankName: 'test bank',
    bankAccount: '11-1111-1111111-111',
    description: 'test description',
    contact: 'test contact',
    userId: auth0Id,
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

describe('GET /api/v1/payees/', () => {
  it('should return payees', async () => {
    expect.assertions(1)
    await mockJwt(auth0Id)
    jest.mocked(db.getPayeesByUserId).mockResolvedValue([payeeList])
    const result = await request(server).get('/api/v1/payees')

    expect(result.body[0]).toMatchObject(payeeList)
  })

  it('should return no auth0 ID error when not logged in', async () => {
    expect.assertions(2)
    await mockJwt('')

    jest.mocked(db.getPayeesByUserId).mockResolvedValue([payeeList])
    const result = await request(server).get('/api/v1/payees')

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
    jest.mocked(db.getPayeesByUserId).mockRejectedValue(new Error(errorMessage))

    const result = await request(server).get('/api/v1/payees')

    expect(result.text).toBe(errorMessage)
  })

  it('should return unknwon error message when error is not typeof Error', async () => {
    expect.assertions(2)
    const errorMessage = 'test error message'
    await mockJwt(auth0Id)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getPayeesByUserId).mockRejectedValue(errorMessage)

    const result = await request(server).get('/api/v1/payees')
    const resultErrorMessage = JSON.parse(result.text)

    expect(result.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while getting payee list.'
    )
  })
})

describe('POST /api/v1/payees/add', () => {
  it('should return id, name after adding new payee', async () => {
    expect.assertions(1)
    await mockJwt(auth0Id)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addPayee).mockResolvedValue([{ id: 3, name: 'name' }])

    const response = await request(server).post('/api/v1/payees/add')
    const result = JSON.parse(response.text)
    expect(result[0]).toMatchObject({ id: 3, name: 'name' })
  })

  it('should return 401 with no auth0 ID', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addPayee).mockResolvedValue([{ id: 3, name: 'name' }])

    const response = await request(server).post('/api/v1/payees/add')

    expect(response.status).toBe(401)
    expect(response.text).toBe(
      'log in failed, please log in first to use service!'
    )
  })

  it('should return error message', async () => {
    expect.assertions(1)
    await mockJwt(auth0Id)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addPayee).mockRejectedValue(new Error('test error message'))

    const response = await request(server).post('/api/v1/payees/add')

    expect(response.text).toBe('test error message')
  })

  it('should return unknown error message when error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt(auth0Id)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.addPayee).mockRejectedValue('test error message')

    const response = await request(server).post('/api/v1/payees/add')
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while adding new payee.'
    )
  })
})

describe('GET /:id', () => {
  it('should return payee Data without auth0Id', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getPayeesByPayeeId).mockResolvedValue([payeeList])

    const response = await request(server).get('/api/v1/payees/1')
    const result = JSON.parse(response.text)

    expect(result[0]).toMatchObject(payeeList)
  })

  it('should return status 500 and set error message when error is type of Error', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.getPayeesByPayeeId)
      .mockRejectedValue(new Error('test error message'))

    const response = await request(server).get('/api/v1/payees/1')

    expect(response.text).toBe('test error message')
  })

  it('should return unknown error message if error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.getPayeesByPayeeId).mockRejectedValue('test error message')

    const response = await request(server).get('/api/v1/payees/1')
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while getting payee details.'
    )
  })
})

describe('PUT /api/v1/payees/update/1', () => {
  it('can update without auth0 ID', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.updatePayee)
      .mockResolvedValue([{ id: 1, name: 'test name' }])

    const response = await request(server).put('/api/v1/payees/update/1')
    const result = JSON.parse(response.text)

    expect(result[0]).toMatchObject({ id: 1, name: 'test name' })
  })

  it('should return status 500 and set error message when error is type of Error', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.updatePayee)
      .mockRejectedValue(new Error('test error message'))

    const response = await request(server).put('/api/v1/payees/update/1')

    expect(response.text).toBe('test error message')
  })

  it('should return unknown error message if error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.updatePayee).mockRejectedValue('test error message')

    const response = await request(server).put('/api/v1/payees/update/1')
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while updating payee details.'
    )
  })
})

describe('DELETE /api/v1/payees/delete/:id', () => {
  it('should delete payee without auth0ID', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.deletePayee).mockResolvedValue(1)

    const response = await request(server).delete('/api/v1/payees/delete/1')
    const result = JSON.parse(response.text)
    expect(result).toBe(1)
  })
  it('should return status 500 and set error message when error is type of Error', async () => {
    expect.assertions(1)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(db.deletePayee)
      .mockRejectedValue(new Error('test error message'))

    const response = await request(server).delete('/api/v1/payees/delete/1')

    expect(response.text).toBe('test error message')
  })
  it('should return unknown error message if error is not typeof Error', async () => {
    expect.assertions(2)
    await mockJwt('')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.mocked(db.deletePayee).mockRejectedValue('test error message')

    const response = await request(server).delete('/api/v1/payees/delete/1')
    const resultErrorMessage = JSON.parse(response.text)

    expect(response.status).toBe(500)
    expect(resultErrorMessage.message).toBe(
      'unknown error occured while deleting payee.'
    )
  })
})
