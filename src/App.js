import { useEffect, useState } from 'react'
import React from 'react';

import {getPhonebook, create, setToken} from './Server/restPhonebook'
import {login} from './Server/login'
import {Phonebook} from './Components/Phonebook'
import {SearchFilter} from './Components/SearchFilter'
import {PersonForm} from './Components/PersonForm'
import {LoginForm} from './Components/LoginForm'
import {Notification} from './Components/Notification'

function App() {
  
  const [phonebook, setPhoneBook] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  useEffect(() =>{
    getPhonebook().then(response => {
      setPhoneBook(response.data)
    }, [])
  })

  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookAppUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }

  }, [])

  const handleUserNameChange = (event) =>{
    setUserName(event.target.value)
  }

  const handlePasswordChange = (event) =>{
    setPassword(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try{
      const user = await login({userName, password})

      setUser(user)

      window.localStorage.setItem('loggedPhonebookAppUser', JSON.stringify(user))
      setToken(user.token)

      setUserName('')
      setPassword('')
    }catch(err){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      },5000)

      console.log(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedPhonebookAppUser')

  }
  const handlePhonebookSubmit = (event) => {
    event.preventDefault()

    let valid = phonebook.filter((person) => {
      return person.name === newName
    }).length === 0

    if(!valid) {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      return
    }


    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }

    create(newPerson)
    setNewName("")
    setNewPhoneNumber("")
  }

  return (
    <div>

      {
         user ? 
            <div>
              <h1>Phonebook</h1>
              <SearchFilter
                text={'search: '}
                handleFilterChange={handleFilterChange}
                filterValue={filterPerson}/>
        
              <h2>Add a new contact</h2>
              <PersonForm 
                  newName= {newName}
                  newPhoneNumber= {newPhoneNumber}
                  handleNameChange = {handleNameChange}
                  handlePhoneNumberChange = {handlePhoneNumberChange}
                  handlePhonebookSubmit = {handlePhonebookSubmit}/>
        
              <h2>Contacts</h2>
              <Phonebook
                phonebook={phonebook}
                filter= {filterPerson}/>
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          : 
            <div>
              <LoginForm username={userName}
                  password={password}
                  handleUserNameChange = {handleUserNameChange}
                  handlePasswordChange = {handlePasswordChange}
                  handleLoginSubmit = {handleLoginSubmit}/>
              <Notification message={errorMessage}/>  
            </div>
        }
     

      
      
   </div>
  );
}

export default App;
