import { Router } from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'
import db from '../db/transactions'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      return res
        .status(401)
        .send('log in failed, please log in first to use service!')
    }
    const transactions = await db.getTransactionsByUserId(auth0Id)
    res.json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res
        .status(500)
        .json({ message: 'unknown error occured while getting transactions.' })
    }
  }
})

router.post('/add', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const transactionData = req.body
    if (!auth0Id) {
      console.error('No auth0 ID')
      return res
        .status(401)
        .send('log in failed, please log in first to use service!')
    }
    const addedTransaction = await db.addTransaction(auth0Id, transactionData)
    res.send(addedTransaction)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res.status(500).json({
        message: 'unknown error occured while adding new transaction.',
      })
    }
  }
})

router.put('/update/:transactionId', async (req, res) => {
  try {
    const transactionData = req.body
    const transactionId = Number(req.params.transactionId)
    const updatedTransaction = await db.updateTransaction(
      transactionId,
      transactionData
    )
    res.send(updatedTransaction)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res.status(500).json({
        message: 'unknown error occured while updating transaction.',
      })
    }
  }
})

router.delete('/delete/:transactionId', async (req, res) => {
  try {
    const transactionId = Number(req.params.transactionId)
    const deletedTransaction = await db.deleteTransaction(transactionId)
    res.send(deletedTransaction)
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      console.log(error)
      res.status(500).json({
        message: 'unknown error occured while deleting transaction.',
      })
    }
  }
})

export default router
