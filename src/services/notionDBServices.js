export function uploadNotionFlashCard ({ question, correctAnswer, subject }) {
  fetch('http://localhost:5000/submitForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'apllication/json'
    },
    body: JSON.stringify({
      question,
      answer: correctAnswer,
      subject
    })
  })
}

export async function fetchNotionFlashCards () {
  const response = await fetch('http://localhost:5001/fetchFlashCards')
  return response.json()
}
