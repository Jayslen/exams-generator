
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
- Hacer un clon del repositorio.
  ```
    git clone https://github.com/Jayslen/exams-generator.git
  ```
- Dentro del proyecto crear un archivo .env con las siguientes informaciones:
    - API key de Geminis - [Aqui la puede generar aqui](https://aistudio.google.com/app/u/1/apikey)
    - Crear una integracion en notion (y guardar el secreto generado por la integracion), para usar notion como base de datos - [Aqui la puede crear](https://www.notion.so/my-integrations) - [Documentacion oficial en caso de necesitarla](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion)
    - Copie la sigiente plantilla en su notion - [Plantilla](https://sprinkle-experience-02f.notion.site/Flashcards-a10d8f1b73e54f47a13c8e177f35074f)
    - Conectar la integracion en la plantilla recien copiada - [Aqui se muestra como hacerlo](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions)
    - Obtener el link de la plantilla de notion, el link a copiar son los numeros que estan despues del nombre como se muestra en la imagen ![image](https://github.com/Jayslen/exams-generator/assets/122827918/4247cddb-e270-40c4-9d41-e250ee12306b)
    - Una vez hecho todo esto copiar las informaciones en el archivo .env con los siguientes nombres:
    ```bash
      VITE_GOOGLE_API_KEY=1234
      NOTION_DATABASE_ID=11234
      NOTION_API_KEY=1234
    ```
### Para abrir el proyecto en el localhost
```bash
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
