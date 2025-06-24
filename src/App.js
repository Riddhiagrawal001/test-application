import React from 'react';  // Import React (needed for JSX)
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SecondPage from "./components/SecondPage"; // Import BrowserRouter for routing
import axios from 'axios';

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
        "company_name": "test-company-name"
      }

      // Make Axios POST call with try-catch
      const response = await axios.post('http://localhost:8080/user/create_merchant', body, {
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

  return (<div>Dashboard
    <button onClick={() => handleApiCall()}>Create a new merchant</button>
    <button onClick={() => navigate('/dashboard/test-application/about')}>Go to About</button>
  </div >);
}

function App() {
  return (
    <BrowserRouter>
      <div>Hello World</div>
      <Routes>
        <Route path="/dashboard/test-application/about" element={<SecondPage />} />
        <Route path="*" element={<MainPage />} />

      </Routes>
    </BrowserRouter >);
};

export default App;