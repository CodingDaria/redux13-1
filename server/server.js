import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]
middleware.forEach((it) => server.use(it))

server.get('/api/v1/products', async (req, res) => {
  const products = await readFile(`${__dirname}/products.json`, { encoding: 'utf8' })
    .then((file) => JSON.parse(file))
    .catch(() => ({ products: 'not available' }))
  res.json(products)
})

server.get('/api/v1/exchange', async (req, res) => {
  const currencies = ['USD', 'EUR', 'CAD']
  const ratesRaw = await axios('https://api.exchangeratesapi.io/latest')
    .then((it) => it.data.rates)
    .catch(() => ({ exchange: 'not available' }))
  const rates = Object.keys(ratesRaw).reduce((acc, rec) => {
    return currencies.indexOf(rec) >= 0 ? { ...acc, [rec]: ratesRaw[rec] } : acc
  }, {})
  res.json(rates)
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
    .then((file) => JSON.parse(file))
    .catch(() => ({ logs: 'not available' }))
  res.json(logs)
})

server.post('/api/v1/logs', async (req, res) => {
  const logs = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' }).then((file) =>
    JSON.parse(file)
  )
  const date = +new Date()
  const dateFull = new Date(date)
  const newLog = { id: date, date: dateFull.toLocaleString('ru'), ...req.body }
  const newLogs = logs.concat(newLog)
  await writeFile(`${__dirname}/logs.json`, JSON.stringify(newLogs), { encoding: 'utf8' })
  res.json(newLogs)
})

server.delete('/api/v1/logs', async (req, res) => {
  await writeFile(`${__dirname}/logs.json`, JSON.stringify([]), { encoding: 'utf8' })
  res.json({ message: 'logs deleted' })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

// https://raw.githubusercontent.com/ovasylenko/skillcrcuial-ecommerce-test-data/master/data.json

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
