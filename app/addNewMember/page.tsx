'use client';
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SendData = {
  username: string,
  status: number,
  team_id: string
}

export default function Page({ searchParams }: { searchParams: { team_id: string } }) {
  const router = useRouter()
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
  }

  const sendInvBtn = async () => {
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
      setTimeout(() => { router.push('/dashboard') }, 2000)
    } else if(result.message !== undefined){
      toast.error(result.message)
    }
  }
  const backBtn = () => {
    router.back()
  }

  const componentRender = () => {
    return(
      <div>
        <h1>Add a new member to the group</h1>
        <label htmlFor="unamevalue">Username: </label>
        <input type="text" className='text-black' onChange={unameHandler} /> <br />
        <button onClick={sendInvBtn}>Send Invite</button> <br />
        <button onClick={backBtn}>Go Back</button>
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
