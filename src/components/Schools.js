import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect,useState } from "react";
import AddSchools from "./AddSchools";
import { ToastContainer, toast } from 'react-toastify';


export default function Schools(){
  const [schools, setSchools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [scDfeNo, setScDfeNo] = useState('');
  const [scFundingType, setScFundingType  ] = useState('');
  const [scName, setScName] = useState('');
  const [scReferenceNo, setScReferenceNo] = useState('');
  const [scPhase, setScPhase] = useState(''); 
  const [scFullTimeWeek, setScFullTimeWeek] = useState('');
  const [scNonGrammer, setScNonGrammer] = useState('');
  const [scEarlyFunding, setScEarlyFunding] = useState('');
 const [error, setError] = useState('');
  
  const columns = [
    { field: 'scDfeNo', headerName: 'DFE No', flex: 1 },
    { field: 'scName', headerName: 'Name', flex: 3},
    { field: 'scReferenceNo', headerName: 'Reference No', flex: 1 },
    { field: 'scPhase', headerName: 'Phase', flex: 1 },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>Edit</Button>
            <Button color="error">Delete</Button>
          </>
        );
      }
}

];

useEffect(() => {
   const fetchSchools = async () => {
       try {
           const response = await fetch('https://localhost:44384/api/Schools');
           if (response.ok) {
               const result = await response.json();
               setSchools(result);
           } else {
               console.error('Error fetching schools');
           }
       } catch (error) {
           console.error('Error during fetch:', error);
       }
   };
   fetchSchools();
},[]);

const handleSaveSchools = async () => {
  if (!scDfeNo || !scFundingType || !scName || !scReferenceNo || !scPhase || !scFullTimeWeek || !scNonGrammer || !scEarlyFunding) {
      setError('Please fill in all fields');
      return;
  }
  const newSchool = {
      scDfeNo: scDfeNo,
      scFundingType:scFundingType,
      scName: scName,
      scReferenceNo:scReferenceNo,
      scPhase:scPhase, 
      scFullTimeWeek:scFullTimeWeek,
      scNonGrammer:scNonGrammer,
      scEarlyFunding:scEarlyFunding,

  }
  try {
    const response = await fetch('https://localhost:44384/api/Schools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSchool),
    });
    if (response.ok) {
      const result = await response.json();
      setSchools((prev) => [...prev, result]);
      setShowModal(false);
      toast.success('School added successfully!');
    } else {
      toast.error('Error saving school');
    }
  }
  catch (error) {
    toast.error('Failed to save role');
  }
}


 const handleAddSchoolClick = () => {
   setShowModal(true);
   setScDfeNo('');
   setScFundingType('');
   setScName('');
   setScReferenceNo('');
   setScPhase('');
   setScFullTimeWeek('');
   setScNonGrammer('');
   setScEarlyFunding('');
   setError('');
 }
 
 const handleModalCloseClick = () => {
   setShowModal(false);
 }
 
 return (
   <Box sx={{ paddingX: 1, paddingTop: 1, marginLeft: '150px' }}>
     <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddSchoolClick}>Add School</Button>
         <DataGrid
             rows={schools}
             columns={columns}
             getRowId={(row) => row.scId}
            pageSizeOptions={[5, 10]}
         />
        
     <AddSchools
       show={showModal}
       onClose={handleModalCloseClick}
       OnSave={handleSaveSchools}
       scDfeNo={scDfeNo}
       setScDfeNo={setScDfeNo}
       scFundingType={scFundingType}
       setScFundingType={setScFundingType}
       scName={scName}
       setScName={setScName}
       scReferenceNo={scReferenceNo}
       setScReferenceNo={setScReferenceNo}
       scPhase={scPhase}
       setScPhase={setScPhase}
       scFullTimeWeek={scFullTimeWeek}
       setScFullTimeWeek={setScFullTimeWeek}
       scNonGrammer={scNonGrammer}
       setScNonGrammer={setScNonGrammer}
       scEarlyFunding={scEarlyFunding}
       setScEarlyFunding={setScEarlyFunding}
       Error={error}
     />
      <ToastContainer position="top-right" />
   </Box>
   

 )
};

