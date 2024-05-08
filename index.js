const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-111111"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "040-211111"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "040-311111"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "040-411111"
  }
]

app.use(express.json())
app.use(cors())

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people </br> ${Date()}</p>`)
})


const generateId = () => (
  Math.ceil(Math.random()*1000)
)

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    console.log('Not found')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})