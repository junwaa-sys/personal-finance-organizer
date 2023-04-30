import { Router } from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'
import db from '../db/payees'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      return res
        .status(401)
        .send('log in failed, please log in first to use service!')
    }
    const payees = await db.getPayeesByUserId(auth0Id)

    res.json(payees)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while getting payee list.' })
    }
  }
})

router.post('/add', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const payeeData = req.body
    if (!auth0Id) {
      console.error('No auth0 ID')
      return res
        .status(401)
        .send('log in failed, please log in first to use service!')
    }
    const addedPayee = await db.addPayee(auth0Id, payeeData)
    res.json(addedPayee)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while adding new payee.' })
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    const payeeId = Number(req.params.id)
    const payeeById = await db.getPayeesByPayeeId(payeeId)
    res.json(payeeById)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while getting payee details.' })
    }
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const payeeId = Number(req.params.id)
    const payeeData = req.body
    const updatedPayee = await db.updatePayee(payeeId, payeeData)
    res.json(updatedPayee)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res.status(500).json({
        message: 'unknown error occured while updating payee details.',
      })
    }
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const payeeId = Number(req.params.id)
    const deletedPayee = await db.deletePayee(payeeId)
    res.json(deletedPayee)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while deleting payee.' })
    }
  }
})

export default router
