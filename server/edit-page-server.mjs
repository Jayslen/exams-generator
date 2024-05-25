import { Client } from '@notionhq/client'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())

const PORT = 5002
const HOST = 'localhost'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
app.post('/updateCardData', jsonParser, async (req, res) => {
  const { pageId, date } = req.body
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Date: {
          type: 'date',
          date: { start: date, end: null, time_zone: null }
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
