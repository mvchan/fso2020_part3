//env variables in .env
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

////////* MIDDLEWARE *////////
//middleware to allow for requests from all origins
app.use(cors())

//middleware for making express show static content from build directory
app.use(express.static('build'))

//middleware for json-parser
//i.e. function that can be used for handling request and response objects
app.use(express.json())

//middleware for console logging
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

morgan.token('data', (request) => (
    JSON.stringify(request.body)
))

////////* REST API SETUP *////////
//always maintain promises properly, especially for POST command below (i.e. place logic inside 'then', relegating error catching to middleware)
app.get('/', (request, response, next) => {
    response.send('<h1>Hello World!</h1>').catch(error => next(error))
})

app.get('/info', (request, response, next) => {
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
        .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(`Person ID # ${result.id} removed`)
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            console.log(`added ${body.name} number ${body.number} to phonebook`)
            response.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    //for update-related methods, validation is off by default and needs to be turned on through runValidators and context options
    Person
        .findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// handler of requests with unknown endpoint
// ** this is the default error handler if next was called without a parameter **
// ** middleware ordering matters, so error handlers like these need to come towards the end **
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handler of requests with result to errors
// ** this is the general error handler and needs to be at the very end; it is called with next(error) **
// ** if there are additional error handlers, add them after this **
const errorHandler = (error, request, response, next) => {
    console.error('*** GENERAL ERROR HANDLER ***')
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

//heroku uses process.env.PORT variable
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})