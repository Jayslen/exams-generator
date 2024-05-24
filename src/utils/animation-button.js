export function animationBtn (e) {
  e.target.classList.toggle('animationButton')
  setTimeout(() => {
    e.target.classList.toggle('animationButton')
  }, 300)
}
