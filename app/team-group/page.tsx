'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Page({ searchParams }: { searchParams: { data: string } }) {
    const [membersData, setMembersData] = useState<any>(null);
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
                    setMembersData(result);
                    console.log(result);
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
            {!loading && !membersData && <p>No data found...</p>}
            {!loading && membersData && (
                <>
                    <h1>Team Name: {searchParams.data}</h1>
                    <h1>Members: </h1>
                    <ul>
                        {membersData.map((member: any) => (
                            // Add the return statement here
                            <li key={member.username}>{member.name}</li>
                        ))}
                    </ul>
                    <Link href={`/addNewMember?team_id=${encodeURIComponent(membersData[0].team_id)}`}>Add a new member</Link> <br />
                    <Link href={'/'}>Go back</Link>
                </>
            )}
        </div>
    );
}

