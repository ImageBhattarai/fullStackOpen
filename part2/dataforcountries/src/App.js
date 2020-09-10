import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Country from './components/Country'

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setData(response.data)
    })
  }, [])

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <p>Find countries <input value={search} onChange={searchHandler} /> </p>
      <Country data={data} search={search} />
    </div>

)}

export default App;
