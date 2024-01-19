'use client';
// This component checks all the groups a user is in
import React from 'react'

type TeamID = {
    team_id: String,
}

export default function CheckingMembers() {
    var IDValue: string = "";

    const IDHandler = (event: any) => {
        IDValue = event.target.value
    }

    const buttonFunc = async () => {
        const dataToSend: TeamID = {
            team_id: IDValue,
        }
        try {
            const response = await fetch('/api/getMembers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <> 
        <label htmlFor="username">Team ID: </label>
        <input type="text" className='text-black' onChange={IDHandler}/> <br />
        <button onClick={buttonFunc}>Click to check teams</button>
    </>
  )
}
