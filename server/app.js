// Add variables from dotenv into process.env vars
import express from 'express'
import next from 'next'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 8000
const ROOT_URL = dev ? `http://localhost:${port}` : 'https://PRODUCTION_URL'

const app = next({ dev })
const handle = app.getRequestHandler()

// Nextjs's server prepared
app.prepare()
  .then(() => {
    const server = express()
    const morganFormat = dev === 'production' ? 'combined' : 'dev'

    server.use(morgan(morganFormat))
    server.use(helmet())
    server.use(cors())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    // Add routes after setting up middleware
    server.use('/api', routes)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    // starting express server
    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on ${ROOT_URL}`)
    })
  })
