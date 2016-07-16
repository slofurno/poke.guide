const http = require('http')
const express = require('express')
const uuid = require('node-uuid')
const server = http.createServer()
const bodyParser = require('body-parser')

const { findMarks, createMark  } = require('./db')

const app = express()
const router = express.Router()
router.use(bodyParser.json())
server.on('request', app)

router.get('/marks', (req, res) => {
  const { x0, x1, y0, y1 } = req.query
  findMarks({x0, x1, y0, y1})
    .then(({rows}) => res.json(rows))
    .catch(err => console.error(err))
})

router.post('/marks', (req, res) => {
  const id = uuid.v4()
  const { x, y } = req.body
  const mark = { id, x, y }
  return createMark(mark)
    .then(() => res.json(mark))
})

app.use(express.static('public'))
app.use('/api', router)
server.listen(3333)
