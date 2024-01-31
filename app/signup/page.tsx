'use client';
import Link from 'next/link';
// This component is create a new user for the app
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastLayout from '../components/essentials/toastlayout';
import { useRouter } from 'next/navigation';

type UserData = {
    name: String,
    username: String,
    organization: String,
    pass: String
}

const SignUp = () => {
    const router: any = useRouter()
    var nameValue: String = "";
    var unameValue: String = "";
    var passValue: String = "";
    var passVerifyValue: String = "";
    var orgValue: String = "";

    const nameHandler = (event: any) => {
        nameValue = event.target.value
        console.log(event.target.value)
    }

    const unameHandler = async (event: any) => {
        unameValue = event.target.value
        const dataToSend = {
            unameVerify: unameValue
        }
        const response = await fetch('api/userNameVerify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        const result = await response.json()
        if(result.message != undefined){
            toast.success(result.message)
        } else if(result.error != undefined){
            toast.error(result.error)
            unameValue = ""
            event.target.value = ""
        }
        console.log(result)
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
                const response = await fetch('/api/userSignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                toast.success("Account successfully created!")
                setTimeout(() => { router.push('/') }, 1000)
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
            <input type="text" onBlur={nameHandler} className="text-black" required/> <br />
            <label htmlFor="uname">Username: </label>
            <input type="text" onBlur={unameHandler} className="text-black" required/> <br />
            <label htmlFor="org">Organization: </label>
            <input type="text" onBlur={orgHandler} className="text-black" required/> <br />
            <label htmlFor="pass">Password: </label>
            <input type="password" onBlur={passHandler} className="text-black" required/> <br />
            <label htmlFor="verify-pass">Verify Password: </label>
            <input type="password" onBlur={passVerifyHandler} className="text-black" required/> <br />
            <button onClick={submit}>Create Account</button> <br />
            <Link href={'/'}>Go back to Home Page</Link>
        </ToastLayout>
    </>
  )
}

export default SignUp