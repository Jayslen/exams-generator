import { useParams } from 'react-router-dom'

export function Exam () {
  const { id } = useParams()
  return (
        <div>Exam</div>
  )
}
