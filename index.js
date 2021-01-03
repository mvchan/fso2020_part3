//env variables in .env
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

////////* MIDDLEWARE *////////
//json-parser middleware
//i.e. function that can be used for handling request and response objects
app.use(express.json())

//middleware to allow for requests from all origins
app.use(cors())

//middleware for making express show static content from build directory
app.use(express.static('build'))

//console logging middleware
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
)

morgan.token("data", (request, response) => (
    JSON.stringify(request.body)
))

////////* REST API SETUP *////////
//always maintain promises properly, especially for POST command below (i.e. place logic inside 'then')
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Person
        .estimatedDocumentCount({})
        .then(count => {
            const message = `
                                Phonebook has info for ${count} people
                                <br/>
                                <br/>
                                ${new Date()}
                            `
            response.send(message)
        })  
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person
        .findById(id)
        .then(person => {
            response.json(person)
        })
        .catch(error => {
            console.log(`Person ID # ${id} not found`)
            response.status(404).end()  
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Person
        .findByIdAndRemove(id)
        .then(result => {
            console.log(`Person ID # ${id} removed`)
            response.status(204).end()
        })
        .catch(error => {
            console.log(`Person ID # ${id} already removed`)
            response.status(404).end()  
        })       
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number is missing' 
        })
    }

    Person
        .find({})
        .then(result => {
            if (result.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
                response.status(400).json({ 
                    error: 'name must be unique' 
                })      
            } else {
                console.log(`now adding ${body.name} number ${body.number} to phonebook...`)
                const person = new Person({
                    name: body.name,
                    number: body.number
                })
            
                person.save().then(result => {
                    console.log(`added ${body.name} number ${body.number} to phonebook`)
                    response.json(result)
                })
            }
        })
        .catch(error => {
            console.log(`error: ${error}`)
            response.status(404).end()  
        })  


})

//heroku uses process.env.PORT variable
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})