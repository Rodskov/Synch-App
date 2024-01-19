'use client';
// This component is create a new user for the app
import React from 'react'

type UserData = {
    name: String,
    username: String,
    id: String,
    organization: String
}

const DataSender = () => {
    var nameValue: String = "";
    var unameValue: String = "";
    var idValue: String = "";
    var orgValue: String = "";

    const nameHandler = (event: any) => {
        nameValue = event.target.value
        console.log(event.target.value)
    }

    const unameHandler = (event: any) => {
        unameValue = event.target.value
        console.log(event.target.value)
    }

    const idHandler = (event: any) => {
        idValue = event.target.value
        console.log(event.target.value)
    }
    
    const orgHandler = (event: any) => {
        orgValue = event.target.value
        console.log(event.target.value)
    }
    
    const buttonTry = async () => {
        const dataToSend: UserData = {
            name: nameValue,
            username: unameValue,
            id: idValue,
            organization: orgValue
        }
        try {
            const response = await fetch('/api/insertData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
        } catch (error) {
            console.log(error)
        }
        alert(nameValue)
    }
  return (
    <>
        <label htmlFor="name">Name: </label>
        <input type="text" onChange={nameHandler} className="text-black"/> <br />
        <label htmlFor="uname">Username: </label>
        <input type="text" onChange={unameHandler} className="text-black"/> <br />
        <label htmlFor="id">ID: </label>
        <input type="text" onChange={idHandler} className="text-black"/> <br />
        <label htmlFor="org">Organization: </label>
        <input type="text" onChange={orgHandler} className="text-black"/> <br />
        <button onClick={buttonTry}>Try if working button</button>
    </>
  )
}

export default DataSender