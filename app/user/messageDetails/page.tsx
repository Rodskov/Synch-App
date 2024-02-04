'use client';
import ToastLayout from '@/app/components/essentials/toastlayout';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function MessageDetails({ searchParams }: { searchParams: { req_id: string } }) {
    const router = useRouter()
    const [authenticated, setAuthenticated] = useState<any>(false)
    const [requestDetails, setRequestDetails] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    useEffect(() => {
        const checkUserDetail = async () => {
            try {
                const dataSend = {
                    req_id: searchParams.req_id
                }
                const response = await fetch('/api/authentication/checkUserInTeam', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                setAuthenticated(result.authenticated)
            } catch (error) {
                
            }
        }

        const fetchDataFromDB = async () => {
            try {
                const dataSend = {
                    req_id: searchParams.req_id
                }
                const response = await fetch('/api/requests/getReqDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                console.log(result)
                if(result[0].req_info !== undefined){
                    setRequestDetails(result)
                    console.log(requestDetails)
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
        fetchDataFromDB()
        checkUserDetail()
        console.log(searchParams.req_id)
    }, [])

    useEffect(() => {
    }, [requestDetails])

    useEffect(() => {
        console.log(authenticated)
    }, [authenticated])

    const acceptBtn = async () => {
        try {
            const dataSend = {
                req_id: searchParams.req_id,
                accept: true
            }
            const response = await fetch('/api/requests/acceptDeclineReq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            toast.success(result)
            setTimeout(() => { router.push('/dashboard') }, 2000)
            const acceptBtnRef:any = document.getElementById('acceptBtn')
            const declineBtnRef:any = document.getElementById('declinetBtn')
            acceptBtnRef.disabled = true
            declineBtnRef.disabled = true
        } catch (error) {
            
        }
    }

    const declineBtn = async () => {
        try {
            const dataSend = {
                req_id: searchParams.req_id,
                accept: false
            }
            const response = await fetch('/api/requests/acceptDeclineReq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const result = await response.json()
            toast.error(result)
            setTimeout(() => { router.push('/dashboard') }, 2000)
            const acceptBtnRef:any = document.getElementById('acceptBtn')
            const declineBtnRef:any = document.getElementById('declinetBtn')
            acceptBtnRef.disabled = true
            declineBtnRef.disabled = true
        } catch (error) {
            
        }
    }

  return (
    <>
        <ToastLayout>
            {loading && (
                <>
                    Loading. Please Wait.
                </>
            )}
            {!authenticated && !loading && (
                <>
                    You do not have access to this content. <br />
                    <Link href={'/'}>Go back</Link>
                </>
            )}
            {!loading && requestDetails && authenticated && (
                <div>
                    Message: <br />
                    {requestDetails[0].req_info}
                    <br /> <br />
                    <button onClick={acceptBtn} id='acceptBtn'>Accept</button> <br />
                    <button onClick={declineBtn} id='declineBtn'>Decline</button> <br />
                    <br />
                    <Link href={'/user/messages'}>Go back</Link>
                </div>
            )}
        </ToastLayout>
    </>
  )
}
