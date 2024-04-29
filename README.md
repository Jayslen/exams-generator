
# Generador de examenes.
Esta pagina web esta hecha con el proposito de ayudar a los estudiantes a estudiar para sus examenes.

Esta tiene la funcionalidad de generar preguntas a partir de un texto que el usuario proveea y poder guardar las preguntas generadas que el usuario desee, donde se guardan en una base de datos en notion para poder estudiarla cuando quieran tipo flashcards.

## Features

- Genera examenes a partir de un texto con la ayuda de GEMINIS AI.
- Guarda el progreso de tu examen en el local storage.
- Guarda los examenes generados en local storage (proximamente en notion).
- Guardar las preguntas que quieras para estudiarlas como flashcard (proximamente).
- Revision de examen una vez el examen completado.

## Instalar el proyecto local

Para correr el proyecto en local:

- Tener instalado nodejs con la version v20.6 o mayor.

Crear un .env file con los siguientes datos:

- Crear tu .env file con la tu api key de Gemini AI.
- El secreto de integracion de notion.
- Link de la base de datos de notion a usar.

```bash
  git clone https://github.com/Jayslen/exams-generator.git
  npm install
  npm run start
```


## Demo

![App Screenshot](https://github.com/Jayslen/exams-generator/blob/master/images/project-gift.gif)


# Screenshots

![App Screenshot](https://github.com/Jayslen/exams-generator/blob/master/images/screnshot-3.png)
![App Screenshot](https://github.com/Jayslen/exams-generator/blob/master/images/screnshot-2.png)
![App Screenshot](https://github.com/Jayslen/exams-generator/blob/master/images/screnshot-1.png)


## Autor

[Desarrollado por Jayslen Rojas Serrano](https://github.com/Jayslen)
