import express from 'express'
import { join, resolve } from 'node:path'

import fruitRoutes from './routes/fruits'
import payeeRoutes from './routes/payees'
import transactionRoutes from './routes/transactions'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/payees', payeeRoutes)
server.use('/api/v1/transaction', transactionRoutes)

server.get('*', (req, res) => {
  res.sendFile(resolve('server/public/index.html'))
})
export default server
