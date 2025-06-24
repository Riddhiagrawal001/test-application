import React from 'react';  // Import React (needed for JSX)
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SecondPage from "./components/SecondPage"; // Import BrowserRouter for routing
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles



function MainPage() {

  const navigate = useNavigate();

  const [profileList, setProfileList] = React.useState([]);
  const [state, setState] = React.useState("Successful");


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
      setState("Loading"); // Set state to Loading before making the API call
      // Get data from localStorage
      let userinfo = getTokenFromLocalStorage('USER_INFO', null);
      let token = userinfo ? userinfo.token : "";


      // Make Axios POST call with try-catch
      const response = await axios.get('http://localhost:9000/api/user/list/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token from localStorage
        }
      });

      // Handle success
      console.log('API call successful:', response.data);
      setProfileList(response.data);
      setState("Successful");
    } catch (error) {
      console.error('Error:', error.message);
      setState("Failed");
      // Handle different types of errors
    }
  };

  const renderProfiles = () => {
    if (state === "Loading") {
      return <div className="text-gray-500">Loading...</div>;
    } else if (state === "Successful" && profileList.length > 0) {
      return profileList.map((profile, index) => (
        <h3 key={index} className="text-lg font-semibold">{profile.profile_name.length > 0 ? profile.profile_name : profile.profile_id}</h3>
      ));
    } else if (state === "Successful" && profileList.length === 0) {
      return <div className="text-gray-500">No profiles found</div>;
    } else {
      return <div className="text-gray-500">Something went wrong</div>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>Main Page</div>
      <button className="border border-blue-400 px-4 py-2 rounded-md bg-blue-200" onClick={() => handleApiCall()}>Fetch profile list</button>
      <button className="border border-blue-400 px-4 py-2 rounded-md bg-blue-200" onClick={() => navigate('/dashboard/test-application/about')}>Go to About</button>
      <div className='flex flex-col gap-4'>
        {renderProfiles()}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <BrowserRouter>
        <p className="text-2xl bold">Test application dashboard</p>
        <Routes>
          <Route path="/dashboard/test-application/about" element={<SecondPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </BrowserRouter >
    </div>);
};

export default App;