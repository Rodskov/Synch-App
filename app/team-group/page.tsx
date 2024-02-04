'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Tasks from '../components/client/tasks/tasks';

export default function Page({ searchParams }: { searchParams: { data: string } }) {
    const [owner, setOwner] = useState<any>(null)
    const [admin, setAdmin] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null)
    const [teamName, setTeamName] = useState<any>(null)
    const [membersData, setMembersData] = useState<any>(null);
    const [authData, setAuthData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const dataSend = {
                    team_id: searchParams.data
                }
                const response = await fetch('/api/getTasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                // console.log(result)
                setTasks(result)
            } catch (error) {
                
            }
        }
        const getTeamName =async () => {
            try {
                const dataSend = {
                    team_id: searchParams.data
                }
                const response = await fetch('/api/getTeamName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                setTeamName(result.team_name)
            } catch (error) {
                
            }
        }
        const getTeamData = async () => {
            var result: any = "";
            
            try {
                const dataToSend = {
                    team_id: searchParams.data,
                };
                const accessResponse = await fetch('/api/authentication/accessLevel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
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
        getTasks();
        getTeamName();
        getTeamData();
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
                    <h1>Team Name: <br /> {teamName}</h1> <br />
                    <h1>Members: </h1>
                    <ul>
                        {membersData.map((member: any) => (
                            <li key={member.username}>{member.name}</li>
                        ))}
                    </ul>
                    <br />
                    {(owner || admin) && (
                        <>
                            <Link href={`/addNewMember?team_id=${encodeURIComponent(membersData[0].team_id)}`}>Add a new member</Link> <br />
                        </>
                    )}
                    <Link href={'/'}>Go back</Link>
                    <div>
                    {tasks.map((task: any) => (
                        <Link href={`/taskDetails?task_id=${encodeURIComponent(task.task_id)}`} key={task.task_id}>
                            <Tasks task_id={task.task_id}/>
                        </Link>
                    ))}
                    </div>
                </>
            )}
        </div>
    );
}

