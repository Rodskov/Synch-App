import React from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import CheckingGroups from '../components/client/checkingGroups'
import Requests from '../components/client/requestsComponent/requests'
import LogoutBtn from '../components/client/buttons/logout'

export default function Dashboard() {
  return (
    <>
        <ToastLayout>
            <CheckingGroups /> <br />
            <Requests /> <br />
            <LogoutBtn />
        </ToastLayout>
    </>
  )
}
