import React, { useState } from 'react'

export default function Character({person}) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
const [isOn, setIsOn] = useState(false)
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const tog = evt => setIsOn(!isOn)
  return (
    <div className={"character-card"} onClick={tog}>
      {/* Use the same markup with the same attributes as in the mock */}
      <h3 className={"character-name"}>{person.name}</h3>
      {
        isOn &&
        <p>Planet: <span className="character-planet">
          {person.homeworld.name}
        </span>
        </p>
      }
    </div>
  )
}


