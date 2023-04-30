export interface Transactions {
  id: number
  transactionDate: string
  payee: string
  amount: number
  code: string
  particular: string
  reference: string
  userId: string
  categoryId: number
  note: string
}

export type NewTransaction = Omit<Transactions, 'id' | 'userId'>
export type UpdateTransaction = Partial<NewTransaction>
