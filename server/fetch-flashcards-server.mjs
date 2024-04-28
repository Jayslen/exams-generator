import { Client } from '@notionhq/client'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())

const PORT = 5001
const HOST = 'localhost'

const notion = new Client({ auth: 'secret_hTkSVkLmllhYqscNH5z6N8JE0keCxItA0kGcNUmFalp' })

app.get('/fetchFlashCards', jsonParser, async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: '808d681ae6744cad983da09091c59a5f'
    })
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
