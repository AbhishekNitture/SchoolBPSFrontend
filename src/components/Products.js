import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


export default function Products(){
    const [products, setProducts] = useState([]);

    const columns=[
        {field : "productTitle", headerName:"Product Title", flex:1},
        {field : "productName", headerName:"Product Name", flex:1},
        // {field : "productImage", headerName:"Product Image", flex:1},
        {field : "productDescription", headerName:"Product Description", flex:2},
        {field : "productCost", headerName:"Product Cost", flex:1},
        {field:"Actions", headerName:"Actions", flex:1, sortable:false,
          renderCell:(params)=>{
            return(
                <>
                    <Button>Edit</Button>
                    <Button color="error">Delete</Button>
                </>
            )
          }
        }

    ]
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const response = await fetch("https://localhost:44384/api/Product");
                if(response.ok){
                    const result = await response.json();
                    setProducts(result);
                }
                else{
                    toast.error("Error fetching products");
                }
            }
            catch(error){
                toast.error("Error during fetch:", error);
            }
        }
        fetchProducts();
    },[])

    return(
        <Box sx={{ paddingX: 1, paddingTop: 1, marginLeft: '150px' }}>
            <Button variant="contained" sx={{ mb: 2 }}>Add Product</Button>
           <DataGrid
             columns={columns}
             rows={products}
             getRowId={(row) => row.productId}
             pageSizeOptions={[5, 10]}
           />

            <ToastContainer position="top-right" />
        </Box>
    )
}