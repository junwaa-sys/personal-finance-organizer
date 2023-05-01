import * as models from '../../../models/transactions'
import { addTransaction } from '../../actions/addTransaction'
import { getTransactions } from '../../actions/getTransactions'
import { updateTransaction } from '../../actions/updateTransaction'
import { deleteTransaction } from '../../actions/deleteTransaction'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'
import TransactionList from './TransactionList'
import EditTransaction from './EditTranscation'
import CsvImporter from './CsvImporter'

export default function Transactions() {
  const [showField, setShowField] = useState(false)
  const [editData, setEditData] = useState<models.Transactions | null>(null)
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const receivedTransactions = useAppSelector((state) => state.getTransactions)
  const addedTransaction = useAppSelector((state) => state.addTransacion)
  const updatedTransaction = useAppSelector((state) => state.updateTransaction)
  const deletedTransaction = useAppSelector((state) => state.deleteTransaction)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getAccessTokenSilently().then((token) => {
      dispatch(getTransactions(token))
    })
  }, [dispatch, getAccessTokenSilently, editData, updatedTransaction])

  function unhideField(data: models.Transactions) {
    setEditData(data)
  }

  async function newTransaction(transData: models.NewTransaction) {
    const token = await getAccessTokenSilently()
    dispatch(addTransaction(token, transData))
  }

  async function editTransaction(
    transId: number,
    transData: models.UpdateTransaction
  ) {
    console.log({ transData, transId })
    await dispatch(updateTransaction(transId, transData))
  }

  if (!receivedTransactions.data) {
    return <div> Loading ....</div>
  } else {
    return (
      <>
        <EditTransaction data={editData} editTransaction={editTransaction} />
        <TransactionList
          transData={receivedTransactions?.data}
          unhideField={unhideField}
        />
        <CsvImporter />
      </>
    )
  }
}
