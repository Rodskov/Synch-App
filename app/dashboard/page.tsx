'use client'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import CheckingGroups from '../components/client/checkingGroups'
import Requests from '../components/client/requestsComponent/requests'
import LogoutBtn from '../components/client/buttons/logout'
import Link from 'next/link'

export default function Dashboard() {
  const [loading, setLoading] = useState<any>(true)
  const [userCookie, setUserCookie] = useState<any>(null)
  useEffect(() => {
    const verifyUser = async() => {
      try {
        const response = await fetch('/api/authentication/homePageCreds')
        const result = await response.json()
        if(result.cookieExist == true){
          setUserCookie(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    verifyUser()
  }, [])
  return (
    <>
        <ToastLayout>
          {userCookie && (
            <>
              <CheckingGroups /> <br />
              <Requests /> <br />
              <Link href={'/createNewTeam'}>Create a team</Link> <br />
              <LogoutBtn />
            </>
          )}
          {!userCookie && (
            <>
              <h1>Restricted access.</h1>
              <Link href={'/'}>Go back to landing page</Link>
            </>
          )}
        </ToastLayout>
    </>
  )
}
