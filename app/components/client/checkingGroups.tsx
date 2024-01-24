'use client';
// Import React and useState
import React, { useState, useEffect } from 'react';

// Define the UserData type
type UserData = {
  username: string;
};

// Define the CheckingGroups component
export default function CheckingGroups() {
  const [groupsData, setGroupsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Define the fetching function using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieResponse = await fetch('/api/cookieChecker');
        const cookieValue = await cookieResponse.json();
        const dataToSend: UserData = {
          username: cookieValue,
        };

        // Fetch groups data from the '/api/getGroups' endpoint
        const response = await fetch('/api/getGroups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        // If the response is successful, set the groupsData state
        if (response.ok) {
          const result = await response.json();
          setGroupsData(result);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        // Set loading to false after fetching is complete
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  // Render the content based on the loading and data state
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !groupsData && <p>Error loading data</p>}
      {!loading && groupsData && (
        <>
        <h1>Name: {groupsData[0].name}</h1>
          <h1>Groups:</h1>
          {/* Render your content using the groupsData */}
          {/* Example: */}
          <ul>
            {groupsData.map((group: any) => (
              <li key={group.team_id}>- {group.team_name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
