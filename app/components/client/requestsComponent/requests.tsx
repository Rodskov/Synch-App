'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Requests() {
    const [reqsData, setReqsData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);

    useEffect(() => {
        const checkReq = async () => {
            try {
                const response = await fetch('/api/requests/getRequests')
                const result = await response.json()
                setReqsData(result.requests)
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        }
        checkReq()
    }, [])

    useEffect(() => {
        console.log(reqsData)
    }, [reqsData]);
  return (
    <>
        {loading && <p>Loading Requests...</p>}
        {!loading && (!reqsData || reqsData.length === 0) && (
            <p>
                No Requests as of Now...
            </p>
        )}
        {!loading && reqsData && reqsData.length > 0 &&(
    <ul>
        {reqsData.map((reqs: any) => (
            <div key={reqs.req_id}>
                {reqs.status === 0 && (
                <Link href={`/user/messageDetails?req_id=${encodeURIComponent(reqs.req_id)}`}>{reqs.sent_from} - {reqs.team_id} </Link>
                )}
            </div>
        ))}
    </ul>
)}
    </>
  )
}
