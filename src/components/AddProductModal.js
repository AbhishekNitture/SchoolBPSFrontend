import {
  FormControl,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddProductModal({
  onSave,
  showProductModal,
  onClose,
  headerText,
  productTitle,
  setProductTitle,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productCost,
  setProductCost,
  productImage,
  setProductImage,
  ImageChange,
  imagePreview,
  setImagePreview,
}) {
  return (
    <Modal
      open={showProductModal}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(event, reason);
        }
      }}
    >
      <ModalDialog
        layout="center"
        size="lg"
        variant="soft"
        sx={{
          width: "500px",
          maxWidth: "90%",
          maxHeight: "90vh",
          overflowY: "auto", // Add scroll if content overflows
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ModalClose />
        <Typography level="h5" component="h2" mb={2}>
          {headerText}
        </Typography>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "40%" }}>
            <Input
              placeholder="Product title"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ width: "60%" }}>
            <Input
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} mt={2}>
          <FormControl sx={{ width: "100%" }}>
            <Textarea
              minRows={3}
              placeholder="Product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} mt={2}>
          <FormControl sx={{ width: "50%" }}>
            <Input
              placeholder="Product cost"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
              <VisuallyHiddenInput type="file" accept="image/*" onChange={ImageChange} />
            </Button>
          </FormControl>
        </Stack>

        {imagePreview && (
          <Stack direction="row" spacing={2} mt={2}>
            <FormControl sx={{ width: "100%" }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Image Preview:
              </Typography>
              <img
                src={imagePreview}
                alt="Product preview"
                style={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </FormControl>
          </Stack>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button color="neutral" variant="contained" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={onSave}>
            Save
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
