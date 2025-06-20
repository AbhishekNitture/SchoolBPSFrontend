import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the onLogout function from the parent to update state
    onLogout();

    // Navigate to login page
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="ms-auto d-flex align-items-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="navbar-brand" to="/Home">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown mr-5">
            <a
              className="navbar-brand dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Tools
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-submenu">
                <a className="dropdown-item" role="button">
                  Users
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/Users" role="button">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Roles">
                      Roles
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Employees">
                      Employees
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <button className="btn btn-danger ms-3" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  </div>
</nav>

    </>
  );
}
