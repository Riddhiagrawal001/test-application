import React from 'react';  // Import React (needed for JSX)
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SecondPage from "./components/SecondPage"; // Import BrowserRouter for routing

function MainPage() {
  const navigate = useNavigate();

  return (<div>Dashboard
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