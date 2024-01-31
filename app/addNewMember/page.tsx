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
  const [owner, setOwner] = useState<any>(null)
  const [admin, setAdmin] = useState<any>(null)
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
        const accessResponse = await fetch('/api/authentication/accessLevel', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataSend)
      })
      if(accessResponse.ok){
        const accessResult = await accessResponse.json()
        if(accessResult[0] !== undefined){
            if(accessResult[0].access_level == 3){
                setOwner(true)
                setAdmin(true)
            } else if(accessResult[0].access_level == 2){
                setOwner(false)
                setAdmin(true)
            } else {
                setOwner(false)
                setAdmin(false)
            }
        }
        else{
            setOwner(false)
            setAdmin(false)
        }
        console.log(accessResult)
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

  const componentRender = () => {
    return(
      <div>
        <h1>Add a new member to the group</h1>
        <label htmlFor="unamevalue">Username: </label>
        <input type="text" className='text-black' onChange={unameHandler} /> <br />
        <button onClick={sendInvBtn}>Send Invite</button> <br />
        <Link href={'/'}>Go back</Link>
      </div>
    )
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
        {!loading && !owner && !admin && (
          <p>
            You do not have access to this content. <br />
            <Link href={'/'}>Go back</Link>
        </p>
        )}
        {!loading && userAuthenticated && owner && admin && (
          componentRender()
        )}
        {!loading && userAuthenticated && !owner && admin && (
          componentRender()
        )}
      </ToastLayout>
    </>
  )
}
