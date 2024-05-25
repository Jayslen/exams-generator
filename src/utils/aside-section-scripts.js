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

export function setAsideElements ({ text }) {
  const HTML_TAGS = [
    { code: '###', htmlTag: 'h3' },
    { code: '##', htmlTag: 'h2' },
    { code: '#', htmlTag: 'h1' },
    { code: '**', htmlTag: 'strong' },
    { code: '*', htmlTag: 'li' },
    { code: '-', htmlTag: 'li' },
    { code: 'default', htmlTag: 'p' }
  ]

  const htmlElements = text.split('\n').map((line) => {
    const textTags =
  HTML_TAGS.find(({ code }) => line.startsWith(code)) ||
  HTML_TAGS.find(({ code }) => code === 'default')
    return line.length > 0
      ? {
          line: line.replaceAll(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ:]/g, ''),
          htmlTag: textTags.htmlTag,
          code: textTags.code
        }
      : undefined
  }).filter((item) => item !== undefined)

  htmlElements.forEach((element, index, arr) => {
    const $aside = document.getElementById('aside')
    const $asideChildren = Array.from($aside.children)
    const $lastElement = arr[index - 1]

    console.dir({ prev: $lastElement, current: element.htmlTag })

    if (element.htmlTag === 'li' && $lastElement.htmlTag !== 'li') {
      const $ul = document.createElement('ul')
      const $li = document.createElement('li')
      $li.innerHTML = element.line
      $ul.append($li)
      $aside.append($ul)
    } else if (element.htmlTag === 'li' && $lastElement.htmlTag === 'li') {
      const $ul = $asideChildren[$asideChildren.length - 1]
      const $li = document.createElement('li')
      $li.innerHTML = element.line
      $ul.append($li)
    } else {
      const htmlElement = document.createElement(element.htmlTag)
      htmlElement.innerHTML = element.line
      $aside.append(htmlElement)
    }
  })
}
