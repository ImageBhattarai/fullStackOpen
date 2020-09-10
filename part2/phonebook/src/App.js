import React, {useState, useEffect} from 'react';
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import FilteredResult from './components/FilteredResult'
import servicesPerson from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ phone, setPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => { 
    servicesPerson.getAll().then(inputField => {
      setPersons(inputField)
    })
  }, [])

  const addHandler = () => {
    const newAdd = {
      name: newName,
      number: phone,
      id: persons.length+1
    }

    axios.post(`http://localhost:3001/persons`, newAdd).then(response => {
      setPersons([...persons, response.data])
      setNotification(newName)
      setTimeout(() => {
        setNotification(null)
      },3000)
      setNewName('')
      setPhone('')
    })
  }
  


  const addName = (event) => {
    event.preventDefault();  
    let nameHolder = newName

    const arrName = persons.map(person => person.name)
    const check = arrName.includes(nameHolder)
    if (check) {
      const result = window.confirm(`${nameHolder} is already added to the phonebook, replace the old number with a new one?`)
      if (result) {
        const nameObject = persons.find(person => person.name === nameHolder)
        const changedNumber = {...nameObject, number: phone}

        axios.put(`http://localhost:3001/persons/${nameObject.id}`, changedNumber ).then(response => {
          setNotification(nameHolder)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          setPersons(persons.map(person => person.name !== nameHolder ? person: response.data ))
        }).catch(error => {
          console.log(error)
          setErrorMessage(`Details of ${nameHolder} has already been deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filter(person => person.name !== nameHolder))
        })
        
      }
      else {
        return null
      }
    }
    else {
      addHandler()
    }
  }

  const searchFilter = (event) => {
    setFilter(event.target.value)
  }


  const addToName = (event) => {
    setNewName(event.target.value)
  }

  const addPhone = (event) => {
    setPhone(event.target.value)
  }

  const deleteHandler = (id) => {
    //console.log(`this id ${id} should be deleted`)
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (result) {
      axios.delete(`http://localhost:3001/persons/${id}`, person).then(response => {
        if (response.data != null ) {
          setPersons(persons.filter(person => person.id !== id))
        }  
      })
    }
    else {
      return null
    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <input value={filter} onChange={searchFilter} />
      <FilteredResult persons={persons} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName} addToName={addToName} 
        addPhone={addPhone} newName={newName} 
        phone={phone}/>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <Person key={person.id} person={person} deleteHandler={() => deleteHandler(person.id)} />
      })}
    </div>
  )
}

export default App;
