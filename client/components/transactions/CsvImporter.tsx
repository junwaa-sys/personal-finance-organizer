import { Importer, ImporterField } from 'react-csv-importer'
import 'react-csv-importer/dist/index.css'
import { addTransaction } from '../../actions/addTransaction'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'
import * as models from '../../../models/transactions'

interface Prop {
  addTransactions: (transactionData: models.NewTransaction) => void
}
export default function CsvImporter() {
  return (
    <>
      <Importer
        dataHandler={async (rows) => {
          // required, may be called several times
          // receives a list of parsed objects based on defined fields and user column mapping;
          // (if this callback returns a promise, the widget will wait for it before parsing more data)
          const expenses = rows.filter((row) => {
            if (Number(row.amount) < 0) {
              return row
            }
          })

          console.log(expenses)
        }}
        defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
        restartable={false} // optional, lets user choose to upload another file when import is complete
        onStart={({ file, preview, fields, columnFields }) => {
          // optional, invoked when user has mapped columns and started import
        }}
        onComplete={({ file, preview, fields, columnFields }) => {
          // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
        }}
        onClose={({ file, preview, fields, columnFields }) => {
          // optional, if this is specified the user will see a "Finish" button after import is done,
          // which will call this when clicked
        }}

        // CSV options passed directly to PapaParse if specified:
        // delimiter={...}
        // newline={...}
        // quoteChar={...}
        // escapeChar={...}
        // comments={...}
        // skipEmptyLines={...}
        // delimitersToGuess={...}
        // chunkSize={...} // defaults to 10000
        // encoding={...} // defaults to utf-8, see FileReader API
      >
        <ImporterField name="transactionDate" label="Transaction Date" />
        <ImporterField name="payee" label="Payee" />
        <ImporterField name="amount" label="Amount" />
        <ImporterField name="particulars" label="Particulars" optional />
        <ImporterField name="code" label="Code" optional />
        <ImporterField name="reference" label="Reference" optional />
      </Importer>
      ;
    </>
  )
}
