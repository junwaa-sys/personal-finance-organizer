import { useEffect, useState, Fragment } from 'react'
import { getPayeesList } from '../../actions/getPayees'
import { addPayee } from '../../actions/addPayee'
import { updatePayee } from '../../actions/updatePayee'
import { deletePayee } from '../../actions/deletePayee'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@tremor/react'
import * as models from '../../../models/payees'
import Modal from './PayeeModal'

export default function Payees() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [payeeIdModal, setPayeeIdModal] = useState<number | null>(null)
  const [modalData, setModalData] = useState<models.PayeeList | null>(null)
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const getPayees = useAppSelector((state) => state.getPayees)
  const addedPayee = useAppSelector((state) => state.addPayee)
  const updatedPayee = useAppSelector((state) => state.updatePayee)
  const deletedPayee = useAppSelector((state) => state.deletePayee)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getAccessTokenSilently().then((token) => {
      dispatch(getPayeesList(token))
    })
  }, [dispatch, getAccessTokenSilently, addedPayee, updatedPayee, deletedPayee])

  function handleOpenModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setShowModal(true)
    const payeeId = e.target.id
    if (getPayees.data != null) {
      const [editData] = getPayees.data.filter((payee) => {
        if (payee.id == payeeId) {
          return { ...payee }
        }
      })
      setModalData(editData)
      setPayeeIdModal(payeeId)
    }
  }

  async function handleSubmit(
    UpdatePayeeData: models.updatePayee,
    submitType: string,
    payeeId: number
  ) {
    const token = await getAccessTokenSilently()
    if (submitType === 'edit') {
      dispatch(updatePayee(payeeId, UpdatePayeeData)).catch((error) => {
        console.log(error)
      })
    } else if (submitType === 'new') {
      dispatch(addPayee(token, UpdatePayeeData)).catch((error) => {
        console.log(error)
      })
      console.log('test')
    }
  }

  function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    payeeId: number
  ) {
    e.preventDefault()
    dispatch(deletePayee(payeeId)).catch((error) => {
      console.log(error)
    })
  }
  function modalClose() {
    setShowModal(false)
  }

  if (!isAuthenticated) {
    return <h1>Please log in to access this page!.</h1>
  }

  return (
    <>
      <Fragment>
        {getPayees.loading && (
          <div className="flex justify-center">
            <p>Loading....</p>
          </div>
        )}
        <Button className="mb-10" onClick={handleOpenModal}>
          Add Payee
        </Button>
        <div className="flex flex-wrap gap-8">
          {getPayees.data?.map((payee, index) => {
            return (
              <>
                <div className="box-border grid h-40 w-48 grid-rows-3 rounded-lg border-2 p-5 shadow-xl md:box-content">
                  <div className="box-content bg-gray-100 p-4" key={index}>
                    {payee.name}
                  </div>
                  <div></div>
                  <div className="grid grid-cols-3 place-content-between">
                    <button
                      className="rounded-lg bg-blue-400 hover:bg-blue-100"
                      id={payee.id.toString()}
                      onClick={handleOpenModal}
                    >
                      Edit
                    </button>
                    <div></div>
                    <button
                      className=" rounded-lg bg-blue-400 hover:bg-blue-100"
                      onClick={(e) => {
                        handleDelete(e, payee.id)
                      }}
                    >
                      Del
                    </button>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <Modal
          show={showModal}
          data={modalData}
          modalClose={modalClose}
          submitPayee={handleSubmit}
          payeeId={payeeIdModal}
        />
      </Fragment>
    </>
  )
}
