'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

 
type UserData = {
    username: String,
    password: String
}

const LogIn = () => {
    const router: any = useRouter()
    var unameValue: string = "";
    var passValue: string = "";
    const unameHandler = (event: any) => {
        console.log(event.target.value)
        unameValue = event.target.value
    }

    const passHandler = (event: any) => {
        console.log(event.target.value)
        passValue = event.target.value
    }

    const btnFunction = async () => {
        const dataToSend: UserData = {
            username: unameValue,
            password: passValue,
        }
        try {
            const response = await fetch('/api/createSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const result = await response.json()
            if(result.success !== undefined){
                router.push('/dashboard')
            }
            if(result.error !== undefined){
                toast.error("Wrong Password or Username")
            }
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" onChange={unameHandler} className='text-black'/> <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" onChange={passHandler} className='text-black'/> <br />
        <button onClick={btnFunction}>Log in</button> <br />
    </>
  )
}

export default LogIn