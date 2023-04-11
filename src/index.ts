import { config } from 'dotenv'

config()
import express from 'express'

const app = express()

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => console.log(`Listening on port ${port}`))