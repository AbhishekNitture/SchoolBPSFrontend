// Products.jsx
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddProductModal from "./AddProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productId, setProductId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://localhost:44384/api/Product/UploadImage", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setProductImage(result.imagePath); // e.g., "/images/abc123.jpg"
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Image upload failed");
        }
      } catch (error) {
        toast.error("Error uploading image");
      }
    }
  };

  const handleAddProductClick = () => {
    setShowModal(true);
    setProductId(null);
    setProductTitle("");
    setProductName("");
    setProductDescription("");
    setProductCost("");
    setProductImage("");
    setImagePreview("");
    setIsEditMode(false);
  };

  const handleProductModalClose = () => {
    setShowModal(false);
    setIsEditMode(false);
  };

  const handleProductEditClick = (product) => {
    setIsEditMode(true);
    setProductTitle(product.productTitle);
    setProductName(product.productName);
    setProductDescription(product.productDescription);
    setProductCost(product.productCost);
    setProductId(product.productId);
    // Ensure full URL for preview
  const baseUrl = "https://localhost:44384"; // Adjust if different
  setImagePreview(`${baseUrl}${product.productImage}`);
    setShowModal(true);
  };

  const handleSaveClick = async () => {
    if (!productTitle || !productName || !productImage || !productDescription || !productCost) {
      toast.error("Please fill in all fields");
      return;
    }

    const newProduct = {
      productId,
      productTitle,
      productName,
      productDescription,
      productCost,
      productImage,
    };

    try {
      const response = await fetch("https://localhost:44384/api/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const result = await response.json();
        setProducts((prev) => [...prev, result]);
        setShowModal(false);
        toast.success("Product saved successfully");
      } else {
        toast.error("Error saving product");
      }
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleProductDeleteClick = async (productId) => {
    try {
      const response = await fetch(`https://localhost:44384/api/Product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product.productId !== productId));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Error deleting product");
      }
    } catch {
      toast.error("Error while deleting product");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:44384/api/Product");
        if (response.ok) {
          const result = await response.json();
          setProducts(result);
        } else {
          toast.error("Error fetching products");
        }
      } catch (error) {
        toast.error("Error during fetch");
      }
    };
    fetchProducts();
  }, []);

  const columns = [
    { field: "productTitle", headerName: "Product Title", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "productDescription", headerName: "Product Description", flex: 2 },
    { field: "productCost", headerName: "Product Cost", flex: 1 },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleProductEditClick(params.row)}>Edit</Button>
          <Button color="error" onClick={() => handleProductDeleteClick(params.row.productId)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ paddingX: 1, paddingTop: 1, marginLeft: "150px" }}>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddProductClick}>
        Add Product
      </Button>
      <DataGrid columns={columns} rows={products} getRowId={(row) => row.productId} pageSizeOptions={[5, 10]} />
      <ToastContainer position="top-right" />
      <AddProductModal
        onSave={handleSaveClick}
        showProductModal={showProductModal}
        onClose={handleProductModalClose}
        headerText={isEditMode ? "Edit Product" : "Add Product"}
        productTitle={productTitle}
        setProductTitle={setProductTitle}
        productName={productName}
        setProductName={setProductName}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        productCost={productCost}
        setProductCost={setProductCost}
        productImage={productImage}
        setProductImage={setProductImage}
        ImageChange={handleImageChange}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />
    </Box>
  );
}
