export function clearAsideSection () {
  const $aside = document.getElementById('aside')
  const $asideChildren = Array.from($aside.children)
  if ($asideChildren.length > 0) {
    $asideChildren.forEach((child) => {
      child.remove()
    })
  }
}

export function getAsideElements () {
  const $aside = document.getElementById('aside')
  const $asideChildren = Array.from($aside.children)
  return { $aside, $asideChildren }
}
