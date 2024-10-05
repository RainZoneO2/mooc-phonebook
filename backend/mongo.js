const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Give password as argument")
  process.exit(1)
}

listBool = (process.argv.length == 3) ? true : false

const password = process.argv[2]

const url = 
`mongodb+srv://dbAdmin:${password}@cluster0.54wll42.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const name = process.argv[3]
const number = process.argv[4]

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (!listBool) {
    person.save().then(result => {
        console.log(`Added ${name} : ${number} to phonebook!`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(persons => {
        console.log('Phonebook: ')
        persons.forEach(person => {
            console.log(`${person.name} | ${person.number}`)
        })
        mongoose.connection.close()
    })
}
