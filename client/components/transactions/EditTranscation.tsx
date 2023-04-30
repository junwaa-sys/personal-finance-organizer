import * as models from '../../../models/transactions'
import dayjs from 'dayjs'

interface Props {
  show: boolean
  data: models.Transactions | null
  hideField: () => void
}

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default function AddEditTransaction({ show, data, hideField }: Props) {
  if (!show) {
    return null
  } else {
    return (
      <div className="mt-10">
        <h2 className="m-5">Add / Edit Transation</h2>
        <form>
          <label htmlFor="id">id:</label>
          <input type="text" name="id" id="id" defaultValue={data?.id} />
          <label htmlFor="transactionDate">Transaction Date:</label>
          <input
            type="date"
            name="transactionDate"
            id="transactionDate"
            defaultValue={dayjs(
              data?.transactionDate,
              'DD/MM/YYYY',
              true
            ).format('YYYY-MM-DD')}
          />
          <label htmlFor="payee">Payee:</label>
          <input
            type="text"
            name="payee"
            id="payee"
            defaultValue={data?.payee}
          />
          <label htmlFor="amount">amount:</label>
          <input
            type="text"
            name="amount"
            id="amount"
            defaultValue={data?.amount}
          />
          <label htmlFor="particular">particular:</label>
          <input
            type="text"
            name="particular"
            id="particular"
            defaultValue={data?.particular}
          />
          <label htmlFor="code">code:</label>
          <input type="text" name="code" id="code" defaultValue={data?.code} />
          <label htmlFor="reference">reference:</label>
          <input
            type="text"
            name="reference"
            id="reference"
            defaultValue={data?.reference}
          />
          <label htmlFor="note">note:</label>
          <textarea name="note" id="note" defaultValue={data?.note} />
        </form>
      </div>
    )
  }
}
