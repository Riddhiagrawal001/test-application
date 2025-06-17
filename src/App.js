import React from 'react';  // Import React (needed for JSX)
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SecondPage from "./components/SecondPage"; // Import BrowserRouter for routing

function MainPage() {
  return <div>Dashboard
    <button onClick={() => {
      window.location.href = '/dashboard/test-application/about';
    }}>Go to About</button>
  </div>;
}

function App() {
  return (
    <BrowserRouter><div>Hello World</div>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/dashboard/test-application/about" element={<SecondPage />} />
      </Routes>
    </BrowserRouter >);
};

export default App;