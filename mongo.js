const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.9da9v.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number
})

//show all records if no arguments beyond password
if (!process.argv[3]) {
    Person
        .find({})
        .then(persons => {
            console.log('phonebook:')
            persons.forEach(personInfo => {
                console.log(`${personInfo.name} ${personInfo.number}`)
            })
            mongoose.connection.close()
        })
    return
}

//add record using arguments beyond password
person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})