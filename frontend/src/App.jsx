import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsDisplay from './components/PersonDisplay'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log('Promise fulfilled..')
      setPersons(initialPersons)
    })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()  
    
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    if (persons.filter((person) => (person.name === newName) && (person.number === newNumber)).length !== 0) {
      setErrorMessage(`${newName} is already added.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return
    }

    if (persons.filter((person) => (person.name === newName) && (person.number !== newNumber)).length !== 0) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}
      return updatePerson(changedPerson)
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(
        `${returnedPerson.name} added successfully`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    })
  }

  const updatePerson = (changedPerson) => {
    if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      personService.update(changedPerson.id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        setSuccessMessage(
          `${returnedPerson.name} updated successfully`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }).catch(error => {
        setErrorMessage(
          `${changedPerson.name} was already deleted from the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== changedPerson.id))
      })
    }
  }

  const deleteHandler = (event) => {
    if (window.confirm("Do you really want to delete?")) {
      console.log('Deleting..', event.target.id)
      personService.remove(event.target.id).catch(error => console.log(error))
      const newPersons = persons.filter(person => person.id !== event.target.id) 
      setPersons(newPersons)
    }
  }

  const escapeRegex = (string) => {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  const regex = new RegExp(`^(${escapeRegex(newFilter)})`, 'i')
  const peopleToShow = persons.filter(person => regex.test(person.name))
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={(errorMessage !== null) ? errorMessage : successMessage} className={(errorMessage !== null) ? 'error' : 'success'}/>
      <h2>Add a new Person</h2>
      <PersonForm 
        handleNameChange={handleNameChange} 
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <PersonsDisplay persons={peopleToShow} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App
