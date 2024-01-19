'use client';
// This component checks all the groups a user is in
import React from 'react'

type UserData = {
    username: String,
}

export default function CheckingGroups() {
    var unameValue: string = "";

    const unameHandler = (event: any) => {
        unameValue = event.target.value
    }

    const buttonFunc = async () => {
        const dataToSend: UserData = {
            username: unameValue,
        }
        try {
            const response = await fetch('/api/getGroups', {
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
        <label htmlFor="username">Username: </label>
        <input type="text" className='text-black' onChange={unameHandler}/> <br />
        <button onClick={buttonFunc}>Click to check teams</button> <br />
    </>
  )
}
