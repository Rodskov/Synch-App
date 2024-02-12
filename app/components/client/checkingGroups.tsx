 'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { json } from 'stream/consumers';

type UserData = {
  user_id: string;
};

export default function CheckingGroups() {
  const [groupsData, setGroupsData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieResponse = await fetch('/api/cookieChecker');
        const cookieValue = await cookieResponse.json();
        const dataToSend: UserData = {
          user_id: cookieValue,
        };

        const response = await fetch('/api/getGroups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const result = await response.json();
          if(result.groupData !== undefined && result.userData !== undefined){
            setGroupsData(result.groupData);
            setUserData(result.userData)
          }
          if(result.message !== undefined){
            toast.error(result.message)
          }
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !groupsData && !userData && (
        <>
          <h1>You do not have access to this content.</h1>
        </>
      )}
      {!loading && (!groupsData || groupsData.length === 0) && userData && (
        <p>
          Name: {userData[0]?.name} <br />
          No teams joined
        </p>
      )}
      {!loading && groupsData && groupsData.length > 0 && (
        <>
          <h1 className='text-3xl font-serif'>Name: {userData[0].name}</h1>
          <h1 className='text-xl font-serif'>Groups:</h1>
          <ul>
            {groupsData.map((group: any) => (
              <div className= 'bg-green-400 rounded w-1/3 min-w-65 p-5 border-black mb-5 mr-5 inline-block hover:min-h-20 font-mono'>
                <Link key={group.team_id} href={`/team-group?data=${encodeURIComponent(group.team_id)}`}>
                  <li>- {group.team_name}</li>
                </Link>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
