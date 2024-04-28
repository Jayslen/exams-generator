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
  const data = await response.json()
  return data.results.map((result) => {
    return {
      question: result.properties.Question.title[0].plain_text,
      answer: result.properties.Answer.rich_text[0].plain_text,
      subject: result.properties.Course.multi_select[0].name
    }
  })
}
