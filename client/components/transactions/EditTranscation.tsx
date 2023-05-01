import * as models from '../../../models/transactions'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface Props {
  data: models.Transactions | null
  editTransaction: (
    transId: number,
    transData: models.UpdateTransaction
  ) => void
}

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default function AddEditTransaction(props: Props) {
  const [editData, setEditData] = useState<models.UpdateTransaction | null>(
    null
  )

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    e.preventDefault()
    setEditData({ ...editData, [e.target.name]: e.target.value })
    console.log(editData)
  }
  function handleCancel() {
    setEditData({ ...props.data })
  }
  return (
    <div className="mt-10">
      <h2 className="m-5">Add / Edit Transation</h2>
      <div className="flex">
        <form>
          <input
            type="hidden"
            name="id"
            id="id"
            defaultValue={props.data?.id}
          />
          <label htmlFor="transactionDate">Transaction Date:</label>
          <input
            type="date"
            name="transactionDate"
            id="transactionDate"
            defaultValue={dayjs(
              props.data?.transactionDate,
              'DD/MM/YYYY',
              true
            ).format('YYYY-MM-DD')}
            onChange={handleChange}
          />
          <label htmlFor="payee">Payee:</label>
          <input
            type="text"
            name="payee"
            id="payee"
            defaultValue={props.data?.payee}
            onChange={handleChange}
          />
          <label htmlFor="amount">amount:</label>
          <input
            type="text"
            name="amount"
            id="amount"
            defaultValue={props.data?.amount}
            onChange={handleChange}
          />
          <label htmlFor="particular">particular:</label>
          <input
            type="text"
            name="particular"
            id="particular"
            defaultValue={props.data?.particular}
            onChange={handleChange}
          />
          <label htmlFor="code">code:</label>
          <input
            type="text"
            name="code"
            id="code"
            defaultValue={props.data?.code}
            onChange={handleChange}
          />
          <label htmlFor="reference">reference:</label>
          <input
            type="text"
            name="reference"
            id="reference"
            defaultValue={props.data?.reference}
            onChange={handleChange}
          />
          <label htmlFor="note">note:</label>
          <textarea
            name="note"
            id="note"
            defaultValue={props.data?.note}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={(e) => {
              props.editTransaction(props.data?.id, editData)
            }}
          >
            SAVE
          </button>
          <button type="button" onClick={handleCancel}>
            CANCEL
          </button>
        </form>
      </div>
    </div>
  )
}
