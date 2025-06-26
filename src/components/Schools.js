import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect,useState } from "react";
import AddSchools from "./AddSchools";
import { ToastContainer, toast } from 'react-toastify';



export default function Schools(){
  const [schools, setSchools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [schoolId,setSchoolId] = useState(null);
  const [scDfeNo, setScDfeNo] = useState('');
  const [scFundingType, setScFundingType  ] = useState('');
  const [scName, setScName] = useState('');
  const [scReferenceNo, setScReferenceNo] = useState('');
  const [scPhase, setScPhase] = useState(''); 
  const [scFullTimeWeek, setScFullTimeWeek] = useState('');
  const [scNonGrammer, setScNonGrammer] = useState('');
  const [scEarlyFunding, setScEarlyFunding] = useState('');
  const [error, setError] = useState('');
  const [IsEdit,setIsEdit] = useState(false);
  const [allSchools,setAllSchools] = useState([]);

 const handleEditClick = (school)=>{
  setShowModal(true);
   setScDfeNo(school.scDfeNo);
   setScFundingType(school.scFundingType);
   setScName(school.scName);
   setScReferenceNo(school.scReferenceNo);
   setScPhase(school.scPhase);
   setScFullTimeWeek(school.scFullTimeWeek);
   setScNonGrammer(school.scNonGrammer);
   setScEarlyFunding(school.scEarlyFunding);
   setError('');
   setSchoolId(school.scId);
   setIsEdit(true);
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
   setIsEdit(false);
 }
 
 const handleModalCloseClick = () => {
   setShowModal(false);
 }
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
            <Button onClick={()=>handleEditClick(params.row)}>Edit</Button>
            <Button color="error" onClick={()=>handleDeleteClick(params.row.scId)}>Delete</Button>
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

const handleUpdateClick = async () =>{
  if(!scDfeNo){
    setError("DFE No is missing");
    return;
  }

  if(!scFundingType){
    setError("Please select funding type");
    return;
  }
  if(!scName){
    setError("School name is missing");
    return;
  }
  if(!scReferenceNo){
    setError("Reference number missing");
    return;
  }
  if(!scPhase){
    setError("Please select phase");
    return;
  }
  if(!scFullTimeWeek){
    setError("Full time week pay missing");
    return;
  }
  if(!scNonGrammer){
    setError("Please select the grammer");
    return;
  }
  if(!scEarlyFunding){
    setError("Please select Early funding type");
    return;
  }

  const UpdateSchool={
    scDfeNo,
    scFundingType,
    scName,
    scReferenceNo,
    scPhase,
    scFullTimeWeek,
    scNonGrammer,
    scEarlyFunding,
    scId : schoolId,
  }
  try{
     const response = await fetch(`https://localhost:44384/api/Schools/${schoolId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(UpdateSchool),
            }); 
            if(response.ok){
              const result = await response.json();

              // Update the allUsers and users state
              setAllSchools((prevSchool) =>
                prevSchool.map((school) =>
                  school.scId === result.scId ? { ...school, ...result } : school
                )
              );
              if (result.scId === parseInt(schoolId)) {
                setSchools((prevSchool) =>
                  prevSchool.map((school) =>
                    school.scId === result.scId ? { ...school, ...result } : school
                  )
                );
              }

              setShowModal(false);
              toast.success('School updated successfully!');
            }else{
                const errorMessage = await response.text();
                console.error('Error updating user:', errorMessage);
                alert('Error updating user: ' + errorMessage);
            }
  }
  catch {
      console.error('Failed to update user:', error);
      alert('Failed to update user.');
  }
}

const handleDeleteClick = async(schoolId)=>{
  try {
     const response = await fetch(`https://localhost:44384/api/Schools/${schoolId}`,{
                method : "DELETE",
                headers : {
                  'Content-Type': 'application/json',
                }
     });
     if (response.ok){
       setSchools((prevSch)=>prevSch.filter((school)=>school.scId !== schoolId));
       toast.success("School deleted successfullt");
     }
  }
  catch{
    toast.error("Error while deleting school");
  }
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
       IsEdit = {IsEdit}
       OnUpdate = {handleUpdateClick}
       headerText = {IsEdit ? "Edit School": "Add School"}
     />
      <ToastContainer position="top-right" />
   </Box>
   

 )
};

