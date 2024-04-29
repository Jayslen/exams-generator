import { Client } from '@notionhq/client'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())

const PORT = 5001
const HOST = 'localhost'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

app.get('/fetchFlashCards', jsonParser, async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    })
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
