// Add this import at the top
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Create the Dashboard component
const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/requests'); // Fetch requests from backend
        setRequests(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Book Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <p>Title: {request.title}</p>
            <p>Email: {request.email}</p>
            <p>ISBN: {request.isbn}</p>
            <p>Author: {request.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;