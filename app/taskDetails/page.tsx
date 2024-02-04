'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function TasksDetails({ searchParams }: { searchParams: { task_id: string } }) {
    const router = useRouter()
    const [members, setMembers] = useState<any>(null)
    const [taskName, setTaskName] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)

    useEffect(() => {
        const getTaskName = async () => {
            try {
                const dataSend = {
                    task_id: searchParams.task_id
                }
                const response = await fetch('/api/tasks/getTaskName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                if(result.length !== undefined){
                    setTaskName(result[0].task_name)
                }
            } catch (error) {
                
            }
        }
        const getMembers = async () => {
            try {
                const dataSend = {
                    task_id: searchParams.task_id
                }
                const response = await fetch('/api/tasks/getTaskMembers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSend)
                })
                const result = await response.json()
                if(result.length !== undefined){
                    console.log(result)
                    setMembers(result)
                    console.log(members)
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
        getTaskName()
        getMembers()
    }, [])
    useEffect(() => {
    }, [members])
    useEffect(() => {
    }, [taskName])
    const goBack = () => {
        router.back()
    }
  return (
    <div>
        {loading && (
            <>
                Task data loading...
            </>
        )}
        {!loading && taskName && (
            <h1>Task Name: {taskName}</h1>
        )}
        {!loading && members && (
            <ul>
                {members.map((member:any) => (
                    <li key={member.username}>- {member.name}</li>
                ))}
            </ul>
        )}
        <button onClick={goBack}>Go back</button>
    </div>
  )
}
