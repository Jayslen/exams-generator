import { Client } from '@notionhq/client'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())

const PORT = 5000
const HOST = process.env.PORT || 'localhost'

const notion = new Client({
  auth: 'secret_hTkSVkLmllhYqscNH5z6N8JE0keCxItA0kGcNUmFalp'
})
const databaseId = '808d681ae6744cad983da09091c59a5f'

app.post('/submitForm', jsonParser, async (req, res) => {
  const { question = [], answer, subject = 'Fundamentos del computador' } = req.body

  try {
    await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: {
        Question: {
          title: [
            {
              text: {
                content: question
              }
            }
          ]
        },
        Answer: {
          rich_text: [
            {
              text: {
                content: answer
              }
            }
          ]
        },
        Course: {
          type: 'multi_select',
          multi_select: [
            {
              name: subject
            }
          ]
        }
      }
    })
    console.log('Form submitted')
  } catch (e) {
    console.log(e)
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
