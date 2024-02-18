export function createPrompt ({ amountOfQuestions, topic }) {
  return `redacta ${amountOfQuestions} preguntas de seleccion multiple sobre el texto que te voy a proveer y damelos en un json con el siguiente formato:
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
       ## La programacion
  
  Es el proceso al que se recurre para crear algun tipo de aplicacion o software, para materializar un concepto o proyecto que requiere de la utilizacion de un lenguaje informatico para poder llevarse a cabo
  
  ## Algoritmos
  
  Es una combinacion de pasos logicos, que tienen un inicio y un final, dipuestos de forma organizada y logica para resolver un problema.
  
  ## Pseudocodigo.
  
  Lenguaje intermedio entre nuestro lenguaje y el lenguaje de programación. El principal objetivo del pseudocódigo es el de representar la solución a un algoritmo de la forma más detallada posible, y a su vez lo más parecida posible al lenguaje que posteriormente se utilizara para la codificación del mismo.
  ## Diagramas de flujo.
  Un Diagrama de Flujo representa la esquematización gráfica de un algoritmo, el cual muestra gráficamente los pasos o procesos a seguir para alcanzar la solución de un problema.`
}
