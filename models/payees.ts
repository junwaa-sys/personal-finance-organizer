export interface PayeeList {
  id: number
  name: string
  bankName: string
  bankAccount: string
  description: string
  contact: string
  userId: string
}
export type newPayee = Omit<PayeeList, 'id' | 'userId'>
export type updatePayee = Partial<newPayee>
