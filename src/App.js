import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roles from './components/Roles';
import Users from './components/Users';
import Employees from './components/Employees';
import Login from './components/Login';
import Schools from './components/Schools';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state from localStorage on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // On successful login, set isLoggedIn to true
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // On logout, set isLoggedIn to false and clear localStorage
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className="container" style={{ marginTop: isLoggedIn ? '5px' : '0' }}>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/Home" element={<Home />} />
              <Route path="/Roles" element={<Roles />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Employees" element={<Employees />} />
              <Route path="/Schools" element={<Schools />} />
              <Route path="*" element={<Navigate to="/Home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
