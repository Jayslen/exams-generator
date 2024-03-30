import { useState } from 'react'
import { DeleteIcon } from '../assets/Icons'
import { LinkComponent } from './LinkComponent'
import { ModalComponent } from './ModalComponent'

export function ExamGenerated ({ title = 'Examen', amount, hasRevision, id, removeItemAction }) {
  const [openModal, setOpenModal] = useState()
  const closModal = () => {
    setTimeout(() => {
      setOpenModal((prev) => !prev)
    }, 600)
  }
  return (
    <>
      {openModal && <ModalComponent title={title} amount={amount} id={id} removeItem={removeItemAction} goBack={closModal}/>}
      <li className="w-full h-auto bg-chicago-100 rounded px-4 py-2 list-none relative">
        <h3 className="font-black text-lg grow">{title}</h3>
        <p className="text-chicago-950 italic font-medium">
          Cantidad de preguntas: {amount}
        </p>
        <div className="flex gap-4">
          <LinkComponent linkTo={`/exam/${id}`} text={'Ir al examen'} />
          <LinkComponent
            linkTo={hasRevision ? `/review/${id}` : '#'}
            text={'Ultima revision'}
          />
        </div>
        <div
          className="absolute bottom-4 right-4 hover:text-red-600 cursor-pointer"
          onClick={() => {
            setOpenModal((prev) => !prev)
          }}
        >
          <DeleteIcon />
        </div>
      </li>
    </>
  )
}
