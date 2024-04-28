import { useState } from 'react'
import { DeleteIcon } from '../assets/Icons'
import { LinkComponent } from './LinkComponent'
import { ModalComponent } from './ModalComponent'
import { toast } from 'react-toastify'
import { ANIMATION_TIME } from '../constants/animation-time'

export function ExamGenerated ({ title = 'Examen sin nombre', amount, hasRevision, id, removeItemAction }) {
  const [openModal, setOpenModal] = useState()
  const closModal = () => {
    setTimeout(() => {
      setOpenModal((prev) => !prev)
    }, ANIMATION_TIME)
  }
  return (
    <>
      {openModal && (
        <ModalComponent
          title={`Esta seguro que desea borrar el examen de ${title}.`}
          firstText={`Esta apunto de eliminar el examen de ${title} con una cantidad de ${amount} preguntas.`}
          secondText={'Esta seguro que desea eliminarlo:'}
          confirmBtnText={'Eliminar'}
          confirmBtnAction={() => {
            removeItemAction({ id })
          }}
          declineBtnText={'Volver atras'}
          closeModal={closModal}
        />
      )}
      <li className="w-full h-auto bg-chicago-100 rounded px-4 py-2 list-none relative">
        <h3 className="font-black text-lg grow">{title}</h3>
        <p className="text-chicago-950 italic font-medium">Cantidad de preguntas: {amount}</p>
        <div className="flex flex-col gap-0.5 xl:gap-2 xl:flex-row">
          <LinkComponent linkTo={`/exam/${id}`} text={'Ir al examen'} />
          <LinkComponent
            linkTo={hasRevision ? `/review/${id}` : '#'}
            text={'Ultima revision'}
            handleClick={() => {
              if (!hasRevision) {
                toast.error('No hay revisiones')
              }
            }}
          />
        </div>
        <div
          className="absolute top-4 right-4 hover:text-red-600 cursor-pointer lg:bottom-4"
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
