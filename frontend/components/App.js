import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

export default function App() {
  // ❗ Create state to hold the data from the API
  const [data, setData ] = useState([])
  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    axios.all([urlPeople, urlPlanets].map((promise) => axios.get(promise)))
      .then(
      axios.spread((people, planets) => {

        let CombinedArr = people.data.map((person) => {

          person.homeworld = planets.data.find((planet) => planet.id == person.homeworld) || undefined

          return person
        }, [])

        setData(CombinedArr)

      })
    ).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }, [])

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */
      data.map((person) => <Character key={person.id} person={person} />)
      }

    </div>
  )
}


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
