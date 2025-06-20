import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Card, CardContent, Typography, Grid } from "@mui/material";

export default function Employees() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); 
  const[IsEdit,setIsEdit] = useState(false);


  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://localhost:44384/api/Employees/GetEmployees");
        setEmployees(response.data);
      } catch (error) {
        setMessage("Error fetching employees: " + error.message);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch and populate the selected employee's data
  const handleCardClick = async (employeeId) => {
    setIsEdit(true);
    setSelectedEmployeeId(employeeId);
    try {
      const response = await axios.get(`https://localhost:44384/api/Employees/${employeeId}`);
      const employee = response.data;

      setName(employee.name);
      setDepartment(employee.department);
      setImagePreview(`https://localhost:44384${employee.profileImagePath}`);
      setProfileImage(null); 
    } catch (error) {
      toast.error("Error fetching employee details: " + error.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    if(!name){
      setMessage("Name is required")
    }
    if(!department){
      setMessage("Department is required")
    }
    if (!profileImage && !imagePreview) {
      setMessage("Profile image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Department", department);
    if (profileImage) {
      formData.append("ProfileImage", profileImage);
    }

    try {
      const response = await axios.post("https://localhost:44384/api/Employees/CreateEmployee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Employee created successfully: ${response.data.name}`);

      setName("");
      setDepartment("");
      setProfileImage(null);
      setImagePreview(null);

      document.getElementById("profileImage").value = "";

      const updatedResponse = await axios.get("https://localhost:44384/api/Employees/GetEmployees");
      setEmployees(updatedResponse.data);
    } catch (error) {
      setMessage("Error creating employee: " + error.message);
    } 
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
  
    if (!name || !department) {
      toast.error("Name and Department are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Department", department);
  
    if (profileImage) {
      formData.append("ProfileImage", profileImage); // Only include if a new image is selected
    }
  
    try {
      const response = await axios.put(
        `https://localhost:44384/api/Employees/${selectedEmployeeId}`,
        formData
      );
  
      toast.success(`Employee updated successfully: ${response.data.name}`);
  
      setName("");
      setDepartment("");
      setProfileImage(null);
      setImagePreview(null);
      setSelectedEmployeeId(null);
      setIsEdit(false);
      document.getElementById("profileImage").value = "";
  
      const updatedResponse = await axios.get(
        "https://localhost:44384/api/Employees/GetEmployees"
      );
      setEmployees(updatedResponse.data);
    } catch (error) {
      toast.error("Error updating employee: " + error.message);
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <h2>{selectedEmployeeId ? "Edit Employee" : "Create Employee"}</h2>
          {message && <Typography variant="body1" color="success.main" align="center">{message}</Typography>}
          <form>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}           
              margin="normal"
            />
            <TextField
              label="Department"
              variant="outlined"
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}            
              margin="normal"
            />

            {imagePreview && (
              <div style={{ marginBottom: "10px", textAlign: "center" }}>
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}

            <input
              type="file"
              id="profileImage"
              onChange={handleFileChange}
              style={{ marginBottom: "10px" }}
            />
            <Button
             onClick={IsEdit ? handleUpdate : handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              
            >
            {IsEdit ? "Update" : "Submit"}
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={8}>
          <h2>Employee List</h2>
          <Grid container spacing={2}>
            {employees.map((employee, index) => (
              <Grid item xs={12} sm={6} md={4} key={employee.id}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    boxShadow: hoveredIndex === index ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "none",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(employee.id)} // Load data on card click
                >
                  <img
                    src={`https://localhost:44384${employee.profileImagePath}`}
                    alt={employee.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{employee.name}</Typography>
                    <Typography variant="body2">{employee.department}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <ToastContainer position="top-right" />
    </div>
  );
}
