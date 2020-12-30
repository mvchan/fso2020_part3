const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [  
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]

const info = () => {
    return (`
        Phonebook has info for ${persons.length} people
        <br/>
        <br/>
        ${new Date()}
    `)
}

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

//json-parser middleware
//i.e. function that can be used for handling request and response objects
app.use(express.json())

//middleware to allow for requests from all origins
app.use(cors())

//console logging middleware
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
)

morgan.token("data", (req, res) => (
    JSON.stringify(req.body)
))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(info())
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {    
        response.json(person)
    } else {    
        console.log(`Person ID # ${id} not found`)
        response.status(404).end()  
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number is missing' 
        })
    }

    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })        
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})