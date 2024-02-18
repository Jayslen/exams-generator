export function createPrompt ({ amountOfQuestions, text }) {
  return `redacta ${amountOfQuestions} preguntas de seleccion multiple sobre el texto que te voy a proveer y damelos en un objeto que en la key questions tenga todas las preguntas y que cada pregunta tenga el siguiente formato:
      {
        "question": "pregunta en español",
        "options": [
         "opción en español",
         "opción en español",
         "opción en español",
         "opción en español"
        ],
        "correctAnswer": "respuesta en español"
       }
       ${text}  
`
}
