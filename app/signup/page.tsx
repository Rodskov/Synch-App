'use client';
import Link from 'next/link';
// This component is create a new user for the app
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastLayout from '../components/essentials/toastlayout';

type UserData = {
    name: String,
    username: String,
    organization: String,
    pass: String
}

const SignUp = () => {
    var nameValue: String = "";
    var unameValue: String = "";
    var passValue: String = "";
    var passVerifyValue: String = "";
    var orgValue: String = "";

    const nameHandler = (event: any) => {
        nameValue = event.target.value
        console.log(event.target.value)
    }

    const unameHandler = (event: any) => {
        unameValue = event.target.value
        console.log(event.target.value)
    }
    
    const orgHandler = (event: any) => {
        orgValue = event.target.value
        console.log(event.target.value)
    }

    const passHandler = (event: any) => {
        passValue = event.target.value
        console.log(passValue)
    }

    const passVerifyHandler = (event: any) => {
        passVerifyValue = event.target.value
        console.log(passVerifyValue)
    }
    
    const submit = async () => {
        const dataToSend: UserData = {
            name: nameValue,
            username: unameValue,
            organization: orgValue,
            pass: passValue
        }
        try {
            if(passValue == passVerifyValue && nameValue != "" && unameValue != "" && passValue != "" && orgValue != ""){
                toast.success("Account successfully created!")
                const response = await fetch('/api/userSignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                setTimeout(() => { window.location.href = "/" }, 2000)
            } else if(passValue != passVerifyValue){
                toast.error('Passwords do not match.')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <ToastLayout>
            <h1>Create an account to start using Synch App</h1>
            <label htmlFor="name">Name: </label>
            <input type="text" onChange={nameHandler} className="text-black" required/> <br />
            <label htmlFor="uname">Username: </label>
            <input type="text" onChange={unameHandler} className="text-black" required/> <br />
            <label htmlFor="org">Organization: </label>
            <input type="text" onChange={orgHandler} className="text-black" required/> <br />
            <label htmlFor="pass">Password: </label>
            <input type="password" onChange={passHandler} className="text-black" required/> <br />
            <label htmlFor="verify-pass">Verify Password: </label>
            <input type="password" onChange={passVerifyHandler} className="text-black" required/> <br />
            <button onClick={submit}>Create Account</button> <br />
            <Link href={'/'}>Go back to Home Page</Link>
        </ToastLayout>
    </>
  )
}

export default SignUp