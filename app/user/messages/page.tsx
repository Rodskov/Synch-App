import Requests from '@/app/components/client/requestsComponent/requests'
import Link from 'next/link'
import React from 'react'

export default function Messages() {
  return (
    <>
        <Requests />
        <Link href={'/dashboard'}>Go Back</Link>
    </>
  )
}
