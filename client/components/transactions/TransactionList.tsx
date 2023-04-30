import { getTransactions } from '../../actions/getTransactions'
import * as models from '../../../models/transactions'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'
import DataTable, {
  TableColumn,
  ExpanderComponentProps,
} from 'react-data-table-component'

interface Props {
  transData: models.Transactions[]
  unhideField: (row: models.UpdateTransaction) => void
}

export default function TransactionList(props: Props) {
  const columns: TableColumn<models.Transactions>[] = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Transaction Date',
      selector: (row) => row.transactionDate,
      sortable: true,
    },
    {
      name: 'Payee',
      selector: (row) => row.payee,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'particular',
      selector: (row) => row.particular,
    },
    {
      name: 'code',
      selector: (row) => row.code,
    },
    {
      name: 'reference',
      selector: (row) => row.reference,
    },
    {
      name: 'note',
      selector: (row) => row.note,
    },
  ]

  return (
    <>
      {!props.transData ? (
        <div className=" flex justify-center">
          <p>Loading....</p>
        </div>
      ) : (
        <>
          <div className="m-5 justify-center border-2">
            <DataTable
              columns={columns}
              data={props.transData}
              highlightOnHover={true}
              noDataComponent={'no data'}
              dense={true}
              pagination
              onRowDoubleClicked={(row, event) => {
                props.unhideField(row)
              }}
            />
          </div>
        </>
      )}
    </>
  )
}
