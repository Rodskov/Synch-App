'use client';
import React from 'react'
import Link from 'next/link'

export default function LogoutBtn() {
    const btnFunction = async () => {
        try {
            const response = await fetch('api/deleteSession')
            const result = await response.json()
            window.location.href = '/'
            console.log(result)
        } catch (error) {
            
        }
    }
  return (
    <>
        <button onClick={btnFunction}>Log Out</button>
    </>
)}