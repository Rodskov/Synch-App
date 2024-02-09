'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ToastLayout from '../components/essentials/toastlayout'
import { toast } from 'react-toastify'

export default function TasksDetails({ searchParams }: { searchParams: { task_id: string } }) {
    const router = useRouter()
    const [members, setMembers] = useState<any>(null)
    const [taskName, setTaskName] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [addNewMember, setAddNewMember] = useState<any>(false)
    const [username, setUsername] = useState<any>(null)

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
    useEffect(() => {

    }, [username])
    const goBack = () => {
        router.back()
    }
    const addMember = () => {
        if(addNewMember == true){
            setAddNewMember(false)
        }
        if(addNewMember == false){
            setAddNewMember(true)
        }
    }
    const unameHandler = (e:any) => {
        const usernameRef = e.target.value
        setUsername(usernameRef)
    }
    const btnSubmit = async () => {
        const addMemberRef:any = document.getElementById('addMemberForm')
        addMemberRef.addEventListener('submit', (e:any) => {
            e.preventDefault()
        })
        const userNameInputRef:any = document.getElementById('username')
        for(var i = 0; i < members?.length; i++){
            if(username === members[i].username){
                toast.error('User is already in the task')
                userNameInputRef.value = ''
                return null
            }
        }
        try {
            const dataSend = {
                username: username,
                task_id: searchParams.task_id
            }
            const response = await fetch('/api/addTaskMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
            const resultResponse = await response.json()
            if(resultResponse.success !== undefined){
                toast.success(resultResponse.success)
            }
            if(resultResponse.error !== undefined){
                toast.error(resultResponse.error)
            }
        } catch (error) {
            
        }
    }
  return (
    <ToastLayout>
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
        <button onClick={addMember}>Add a member</button> <br />
        {addNewMember && (
            <form method='POST' id='addMemberForm'>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" className='text-black' onChange={unameHandler}/> <br />
                <button onClick={btnSubmit}>Add the member to task</button>
            </form>
        )}
        <button onClick={goBack}>Go back</button>
    </ToastLayout>
  )
}
