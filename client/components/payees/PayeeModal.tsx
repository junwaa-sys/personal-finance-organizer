import { Button } from '@tremor/react'
import * as models from '../../../models/payees'
import { useState } from 'react'

interface Props {
  show: boolean
  data: models.PayeeList | null
  modalClose: () => void
  submitPayee: (
    payeeData: models.updatePayee,
    submitType: string,
    payeeId: number | null
  ) => void
  payeeId: number | null
}

export default function Modal({
  show,
  data,
  modalClose,
  submitPayee,
  payeeId,
}: Props) {
  const [modalData, setModalData] = useState<models.updatePayee | null>(null)

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    if (modalData != null) {
      setModalData({ ...modalData, [name]: value })
      console.log(payeeId)
    } else {
      setModalData({ [name]: value })
      console.log(payeeId)
    }
  }

  function handleClose() {
    modalClose()
    setModalData(null)
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (data == null) {
      if (modalData != null) {
        submitPayee(modalData, 'new', null)
      }
    } else {
      if (modalData != null) {
        submitPayee(modalData, 'edit', payeeId)
      }
    }
    handleClose()
    setModalData(null)
  }

  if (!show) {
    return null
  }

  return (
    <>
      <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
        <div className="flex w-[700px] flex-col">
          <div className="flex-rows flex rounded bg-white p-2">
            <form className="border">
              <div className="ml-2 grid grid-cols-4 gap-2">
                <label htmlFor="name">Payee Name:</label>
                <input
                  className="border"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Payee Name"
                  onChange={handleInputChange}
                  defaultValue={data?.name}
                  value={modalData?.name}
                />
                <label htmlFor="bankName">Bank Name:</label>
                <input
                  className="border"
                  type="text"
                  name="bankName"
                  id="bankName"
                  placeholder="Bank Name"
                  onChange={handleInputChange}
                  defaultValue={data?.bankName}
                  value={modalData?.bankName}
                />
                <label htmlFor="bankName">Bank Account:</label>
                <input
                  className="border"
                  type="text"
                  name="bankAccount"
                  id="bankAccount"
                  placeholder="Account Number"
                  onChange={handleInputChange}
                  defaultValue={data?.bankAccount}
                  value={modalData?.bankAccount}
                />
                <label htmlFor="bankName">Contact:</label>
                <input
                  className="border"
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="contact"
                  onChange={handleInputChange}
                  defaultValue={data?.contact}
                  value={modalData?.contact}
                />
                <div className="col-span-4 col-start-1 grid grid-cols-2">
                  <label htmlFor="bankName">Description:</label>
                  <textarea
                    className="border"
                    name="description"
                    id="description"
                    placeholder="Description"
                    onChange={handleInputChange}
                    defaultValue={data?.description}
                    value={modalData?.description}
                  />
                </div>
              </div>
              <div className="m-5 flex justify-end gap-2">
                <Button size="sm" onClick={handleSubmit}>
                  Save
                </Button>
                <Button size="sm" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
