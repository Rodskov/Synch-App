'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Page({ searchParams }: { searchParams: { data: string } }) {
    const [membersData, setMembersData] = useState<any>(null);
    const [authData, setAuthData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTeamData = async () => {
            var result: any = "";
            try {
                const dataToSend = {
                    team_id: searchParams.data,
                };
                const response = await fetch('/api/getMembers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                if (response.ok) {
                    result = await response.json();
                    if(result[0]?.username != undefined){
                        setMembersData(result);
                        setAuthData(true)
                        console.log(result);
                    }
                    if(result.authenticaed !== undefined){
                        setAuthData(result.message)
                        console.log(result)
                    }
                } else {
                    console.error('Error: ', response.status);
                }
            } catch (error) {
                console.error('Fetch Error: ', error);
            } finally {
                setLoading(false);
            }
        };
        getTeamData();
        console.log(searchParams.data);
    }, []);

    return (
        <div>
            {loading && <p>Data loading...</p>}
            {!loading && !authData && !membersData && (
                <p>
                    You do not have access to this content... <br />
                    <Link href={'/'}>
                        <button>Go Back</button>
                    </Link>
                </p>
            )}
            {!loading && membersData && authData && (
                <>
                    <h1>Team Name: <br /> {searchParams.data}</h1> <br />
                    <h1>Members: </h1>
                    <ul>
                        {membersData.map((member: any) => (
                            // Add the return statement here
                            <li key={member.username}>{member.name}</li>
                        ))}
                    </ul>
                    <br />
                    <Link href={`/addNewMember?team_id=${encodeURIComponent(membersData[0].team_id)}`}>Add a new member</Link> <br />
                    <Link href={'/'}>Go back</Link>
                </>
            )}
        </div>
    );
}

