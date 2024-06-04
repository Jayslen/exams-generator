export const filterCards = ({ date }) => {
  const [currentDay, currentMonth] = [
    new Date().getDate(),
    new Date().getMonth() + 1
  ]
  const [day, month] = [new Date(date).getDate(), new Date(date).getMonth() + 1]
  return currentDay >= day && currentMonth >= month
}
