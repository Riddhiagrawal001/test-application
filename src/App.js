import React from 'react';  // Import React (needed for JSX)
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SecondPage from "./components/SecondPage"; // Import BrowserRouter for routing
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles


function MainPage() {
  const navigate = useNavigate();


  const getTokenFromLocalStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      throw new Error(`Failed to get token from localStorage`);
    }
  };

  const handleApiCall = async () => {
    try {
      // Get data from localStorage
      let userinfo = getTokenFromLocalStorage('USER_INFO', null);
      let token = userinfo ? userinfo.token : "";
      let body = {
        "product_type": "orchestration",
        "company_name": "testcompanyname"
      }

      // Make Axios POST call with try-catch
      const response = await axios.post('http://localhost:9000/api/user/create_merchant', body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token from localStorage
        }
      });

      // Handle success
      console.log('API call successful:', response.data);

    } catch (error) {
      console.error('Error:', error.message);
      // Handle different types of errors
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>Dashboard</div>
      <button className="border border-blue-400 px-4 py-2 rounded-md bg-blue-200" onClick={() => handleApiCall()}>Create a new merchant</button>
      <button className="border border-blue-400 px-4 py-2 rounded-md bg-blue-200" onClick={() => navigate('/dashboard/test-application/about')}>Go to About</button>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <BrowserRouter>
        <p className="text-2xl bold">Hello World</p>
        <Routes>
          <Route path="/dashboard/test-application/about" element={<SecondPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </BrowserRouter >
    </div>);
};

export default App;