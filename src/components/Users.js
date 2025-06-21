import React, { useState, useEffect } from 'react';
import AddUserModal from './AddUserModal';
import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function Users() {  
    const [showModal, setShowModal] = useState(false);
    const [roles, setRoles] = useState([]); // Initialize roles as an empty array
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [title, setTitle] = useState("");
    const [login, setLogin] = useState("");
    const [surname, setSurname] = useState("");
    const [emailId, setEmailId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [expiredon, setExpiredon] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [allUsers, setAllUsers] = useState([]); // Store all users
    const [users, setUsers] = useState([]); // Displayed users based on selected role
    const [Error, setError] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [userId, setUserId] = useState(null);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rolesResponse, usersResponse] = await Promise.all([
                    fetch('https://localhost:44384/api/Role'),
                    fetch('https://localhost:44384/api/Users')
                ]);
    
                if (rolesResponse.ok && usersResponse.ok) {
                    const rolesResult = await rolesResponse.json();
                    const usersResult = await usersResponse.json();                  
                    setRoles(rolesResult || []);  
                    setAllUsers(usersResult || []);
                } else {
                    alert('Error fetching roles or users');
                }
            } catch (error) {
                alert('Error during the fetch:', error);
            }
        };
    
        fetchData();
    }, []);  
    
   
    const handleSaveRole = async () => {
        if (!title) {
            setError("Please select title ");
            return;  
        }
        if (!login) {
            setError("Please enter login ");
            return; 
        }
        if (!surname) {
            setError("Please enter the surname ");
            return;  
        }
        if (!emailId) {
            setError("Please enter the email");
            return;  
        }
        if (!firstname) {
            setError("Please enter the first name ");
            return;  
        }
        
        const newUser = {
            title,
            login,
            surname,
            emailId,
            firstname,
            expiredon,
            isActive,
            roleId: selectedRoleId 
        };

        try {
            const response = await fetch('https://localhost:44384/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const result = await response.json();
                setAllUsers((prevUsers) => [...prevUsers, result]);
                if (result.roleId === parseInt(selectedRoleId)) {
                    setUsers((prevUsers) => [...prevUsers, result]);
                }
                handleCloseModal();
                toast.success('User added successfully!');
            } else {
                const errorMessage = await response.text();
                console.error('Error saving user:', errorMessage);
                alert('Error saving user: ' + errorMessage);
            }
        } catch (error) {
            console.error('Failed to save user:', error);
            alert('Failed to save user.');
        }
    };
    const handleUpdateClick = async () => {
        if (!title) {
            setError("Please select a title.");
            return;
        }
        if (!login) {
            setError("Please enter a login.");
            return;
        }
        if (!surname) {
            setError("Please enter a surname.");
            return;
        }
        if (!emailId) {
            setError("Please enter an email.");
            return;
        }
        if (!firstname) {
            setError("Please enter a first name.");
            return;
        }
    
        const updatedUser = {
            title,
            login,
            surname,
            emailId,
            firstname,
            expiredon,
            isActive,
            roleId: selectedRoleId,
        };
    
        try {
            const response = await fetch(`https://localhost:44384/api/Users/${userId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
    
            if (response.ok) {
                const result = await response.json();
                
                // Update the allUsers and users state
                setAllUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === result.id ? { ...user, ...result } : user
                    )
                );
                if (result.roleId === parseInt(selectedRoleId)) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === result.id ? { ...user, ...result } : user
                        )
                    );
                }
    
                handleCloseModal();
                toast.success('User updated successfully!');
            } else {
                const errorMessage = await response.text();
                console.error('Error updating user:', errorMessage);
                alert('Error updating user: ' + errorMessage);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update user.');
        }
    };

    const handleDeleteClick = async (userId) => {
        try {
            const response = await fetch(`https://localhost:44384/api/Users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                // Update local state to reflect deletion
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                toast.success('User deleted successfully!');
            } else {
                const errorData = await response.json(); // Parse the error response
                console.error('Error response:', errorData);
                alert(`Error deleting user: ${errorData.title || response.statusText}`);
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert('Network error: Unable to delete user.');
        }
    };

    function handleChangeSelection(event) {
        const selectedValue = event.target.value;
        setSelectedRoleId(selectedValue);
        // Filter users based on the selected role
        const filteredUsers = allUsers.filter(user => user.roleId === parseInt(selectedValue));
        setUsers(filteredUsers); // Set displayed users to match selected role
    }

    function handleAddUsersClick() {
        setShowModal(true);
        setTitle("");
        setLogin("");
        setSurname("");
        setEmailId("");
        setFirstname("");
        setExpiredon("");
        setIsActive(false);
        setError("");
        setIsEditMode(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function handleEditClick(user){
    console.log(user);
     setShowModal(true);
     setTitle(user.title);
     setLogin(user.login);
     setSurname(user.surname);
     setEmailId(user.emailid);
     setFirstname(user.firstname);
     setExpiredon(user.expiredon);
     setIsActive(user.isActive);
     setSelectedRoleId(user.roleId);
     setError("");
     setIsEditMode(true);
     setUserId(user.id);
    }

    
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 120 },
        { field: 'firstname', headerName: 'First Name', width: 200 },
        { field: 'login', headerName: 'Login', width: 200 },
        { field: 'surname', headerName: 'Surname', width: 200 }, 
        { field: 'emailid', headerName: 'Email', width: 200 }, 
        {
            field: 'isActive',
            headerName: 'Active',
            width: 100,
            renderCell: (params) => (
                <input type="checkbox" checked={params.value} disabled />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        className="btn btn-link"
                        onClick={() => handleEditClick(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        className="btn btn-link text-danger"
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];
    

    return (
    <div className="container-fluid" style={{ paddingLeft: '260px' }}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mt-3">List of Available Users</h2>

        <div className="container mt-4">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-2">
              <label className="mt-1"><b>Select Role</b></label>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={handleChangeSelection}
              >
                <option value="">Choose...</option>
                {Array.isArray(roles) && roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          {selectedRoleId && (
            <Button variant="contained" onClick={handleAddUsersClick}>
              Add User
            </Button>
          )}

          <Paper sx={{ height: 500, width: '100%', marginTop: 2, overflowX: 'auto' }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
            />
          </Paper>
        </div>

        <AddUserModal
          onSave={handleSaveRole}
          onClose={handleCloseModal}
          showModal={showModal}
          title={title}
          setTitle={setTitle}
          login={login}
          setLogin={setLogin}
          surname={surname}
          setSurname={setSurname}
          EmailId={emailId}
          setEmailId={setEmailId}
          firstname={firstname}
          setFirstname={setFirstname}
          expiredon={expiredon}
          setExpiredon={setExpiredon}
          isActive={isActive}
          setIsActive={setIsActive}
          Error={Error}
          headingtitle={isEditMode ? "Edit User" : "Add User"}
          IsEdit={isEditMode}
          onUpdate={handleUpdateClick}
        />

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}
