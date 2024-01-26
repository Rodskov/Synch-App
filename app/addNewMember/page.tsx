'use client';
import React from 'react'
import ToastLayout from '../components/essentials/toastlayout';

type SendData = {
  username: string,
  status: number
}

export default function Page() {
  var unameValue: string = "";
  const statusValue: number = 0;

  const unameHandler = (event: any) => {
    unameValue = event.target.value
    console.log(unameValue)
  }

  const sendInvBtn = async () => {
    const dataToSend: SendData = {
      username: unameValue,
      status: statusValue
    }
    const response = await fetch('api/newMemberReq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    const result = await response.json()
    console.log(result)
  }
  return (
    <>
      <ToastLayout>
        <h1>Add a new member to the group</h1>
        <label htmlFor="unamevalue">Username: </label>
        <input type="text" className='text-black' onChange={unameHandler} /> <br />
        <button onClick={sendInvBtn}>Send Invite</button>
      </ToastLayout>
    </>
  )
}
