'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import ToastLayout from '../essentials/toastlayout';

 
type UserData = {
    username: String,
    password: String
}

const LogIn = () => {
    const router: any = useRouter()
    var unameValue: string = "";
    var passValue: string = "";
    const unameHandler = (event: any) => {
        unameValue = event.target.value
    }

    const passHandler = (event: any) => {
        passValue = event.target.value
    }

    const btnFunction = async () => {
        const loginFormRef = document.getElementById('loginForm')
        loginFormRef?.addEventListener('submit', (e:any) => {
            e.preventDefault()
        })
        if(unameValue !== "" || passValue !== ""){
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
                    setTimeout(() => { router.push('/dashboard') }, 500)
                }
                if(result.error !== undefined){
                    toast.error(result.error)
                }
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        else{
            toast.error("Please fill out all fields")
        }
    }
  return (
    <>
        <ToastLayout>
            <div className='ml-auto bg-green-400'>
                <div className=''>
                    <form method='POST' id='loginForm'>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" onChange={unameHandler} className='text-black'/> <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" onChange={passHandler} className='text-black'/> <br />
                        <button onClick={btnFunction}>Log in</button> <br />
                    </form>
                </div>
            </div>
        </ToastLayout>
    </>
  )
}

export default LogIn