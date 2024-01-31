'use client';
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout';
import { toast } from 'react-toastify';
import Link from 'next/link';

type SendData = {
  username: string,
  status: number,
  team_id: string
}

export default function Page({ searchParams }: { searchParams: { team_id: string } }) {
  const [userAuthenticated, setUserAuthenticated] = useState<any>(null)
  const [loading, setLoading] = useState<any>(true)
  var unameValue: string = "";
  const statusValue: number = 0;

  useEffect(() => {
    const credentialCheck = async () => {
      try {
        const dataSend: any = {
          team_id: searchParams.team_id
        }
        const response = await fetch('/api/authentication/checkUserCreds', {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(dataSend)
        })
        const credsResult = await response.json()
        setUserAuthenticated(credsResult.authenticated)
        console.log(credsResult)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    credentialCheck()
  
  }, [])

  const unameHandler = (event: any) => {
    unameValue = event.target.value
    console.log(unameValue)
  }

  const sendInvBtn = async () => {
    console.log(searchParams.team_id)
    const dataToSend: SendData = {
      username: unameValue,
      status: statusValue,
      team_id: searchParams.team_id
    }
    const response = await fetch('api/newMemberReq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    const result = await response.json()
    if(result.receiver !== undefined){
      console.log(result.receiver)
      toast.success("Invitation is sent to " + result.receiver)
    } else if(result.message !== undefined){
      console.log(result.message)
      toast.error(result.message)
    }
  }

  return (
    <>
      <ToastLayout>
        {loading && !userAuthenticated && (
          <p>
            Loading...
          </p>
        )}
        {!loading && !userAuthenticated && (
          <p>
            You do not have access to this content. <br />
            <Link href={'/'}>Go back</Link>
        </p>
        )}
        {!loading && userAuthenticated && (
          <div>
            <h1>Add a new member to the group</h1>
            <label htmlFor="unamevalue">Username: </label>
            <input type="text" className='text-black' onChange={unameHandler} /> <br />
            <button onClick={sendInvBtn}>Send Invite</button> <br />
            <Link href={'/'}>Go back</Link>
          </div>
        )}
      </ToastLayout>
    </>
  )
}
