import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roles from './components/Roles';
import Users from './components/Users';
import Employees from './components/Employees';
import Login from './components/Login';
import Schools from './components/Schools';
import Products from './components/Products';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const loggedIn = sessionStorage.getItem('isLoggedIn');
  if (loggedIn === 'true') {
    setIsLoggedIn(true);
  }
}, []);

const handleLogin = () => {
  setIsLoggedIn(true);
  sessionStorage.setItem('isLoggedIn', 'true');
};

const handleLogout = () => {
  setIsLoggedIn(false);
  sessionStorage.removeItem('isLoggedIn');
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
              <Route path="/Products" element={<Products />} />
              <Route path="*" element={<Navigate to="/Home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
