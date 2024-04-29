import { Client } from '@notionhq/client'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())

const PORT = 5000
const HOST = 'localhost'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

app.post('/submitForm', jsonParser, async (req, res) => {
  const { question, answer, subject = 'otra' } = req.body
  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID
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
    res.status(200).json({ message: 'request created succesfuly' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
