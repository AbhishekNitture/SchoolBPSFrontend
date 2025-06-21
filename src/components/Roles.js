import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Paper,
  Button,
  Typography
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import 'react-toastify/dist/ReactToastify.css';
import AddModal from './AddModal';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://localhost:44384/api/Role');
        if (response.ok) {
          const result = await response.json();
          setRoles(result);
        } else {
          toast.error('Error fetching roles');
        }
      } catch (error) {
        toast.error('Error during fetch');
      }
    };
    fetchRoles();
  }, []);

  const handleSaveRole = async () => {
    if (!roleName || !roleDesc) {
      setError("Please fill in all fields");
      return;
    }
    const newRole = { name: roleName, description: roleDesc, isActive };
    try {
      const response = await fetch('https://localhost:44384/api/Role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole),
      });
      if (response.ok) {
        const result = await response.json();
        setRoles((prev) => [...prev, result]);
        toast.success('Role added successfully!');
      } else {
        toast.error('Error saving role');
      }
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save role');
    }
  };

  const handleUpdate = async () => {
    if (!roleName || !roleDesc) {
      setError("Please fill in all fields");
      return;
    }
    const updatedRole = { name: roleName, description: roleDesc, isActive };
    try {
      const response = await fetch(`https://localhost:44384/api/Role/${roleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRole),
      });
      if (response.ok) {
        setRoles((prev) =>
          prev.map((role) => (role.id === roleId ? { ...role, ...updatedRole } : role))
        );
        toast.success('Role updated successfully!');
      } else {
        toast.error('Error updating role');
      }
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const response = await fetch(`https://localhost:44384/api/Role/${roleId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRoles((prev) => prev.filter((role) => role.id !== roleId));
        toast.success('Role deleted successfully!');
      } else {
        toast.error('Error deleting role');
      }
    } catch (error) {
      toast.error('Failed to delete role');
    }
  };

  const handleAddRoleClick = () => {
    setShowModal(true);
    setRoleName('');
    setRoleDesc('');
    setIsActive(false);
    setError('');
    setIsEditMode(false);
  };

  const handleEditRoleClick = (role) => {
    setShowModal(true);
    setRoleId(role.id);
    setRoleName(role.name);
    setRoleDesc(role.description);
    setIsActive(role.isActive);
    setError('');
    setIsEditMode(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRoleName('');
    setRoleDesc('');
    setIsActive(false);
    setError('');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(roles);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Roles');
    XLSX.writeFile(wb, 'RolesData.xlsx');
  };

  const columns = [
    { field: 'name', headerName: 'Role Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 0.5,
      renderCell: (params) => (
        <input type="checkbox" checked={params.value} disabled />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditRoleClick(params.row)}>Edit</Button>
          <Button color="error" onClick={() => handleDeleteRole(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ paddingX: 3, paddingTop: 3, marginLeft: '240px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        List of Available Roles
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={handleAddRoleClick}>
          Add Role
        </Button>
        <Button variant="outlined" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={roles}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
        />
      </Paper>

      <AddModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveRole}
        onUpdate={handleUpdate}
        roleName={roleName}
        roleDesc={roleDesc}
        isActive={isActive}
        setRoleName={setRoleName}
        setRoleDesc={setRoleDesc}
        setIsActive={setIsActive}
        showError={error}
        title={isEditMode ? 'Edit Role' : 'Add Role'}
        isEditMode={isEditMode}
      />

      <ToastContainer position="top-right" />
    </Box>
  );
}
