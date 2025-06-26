import React from 'react';
import { Modal, ModalDialog, ModalClose, Typography, Button, FormControl, Input, Checkbox } from '@mui/joy';

export default function AddModal({
    show,
    onClose,
    onSave,
    onUpdate,
    roleName,
    roleDesc,
    isActive,
    setRoleName,
    setRoleDesc,
    setIsActive,
    showError,
    title,
    isEditMode,
}) {
    return (
        <Modal
            open={show}
            onClose={(event,reason)=>{
                if(reason!=="backdropClick"){
                    onClose(event,reason);
                }
            }}
        >
            <ModalDialog
                layout="center"
                size="lg"
                variant="soft"
            >
                <ModalClose />
                <Typography level="h5" component="h2" mb={2}>
                    {title}
                </Typography>
                <FormControl sx={{ mb: 2 }}>
                    <Input
                        fullWidth
                        placeholder="Role Name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                    <Input
                        fullWidth
                        placeholder="Description"
                        value={roleDesc}
                        onChange={(e) => setRoleDesc(e.target.value)}
                    />
                </FormControl>
                <FormControl
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Checkbox
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                        sx={{ mr: 1 }}
                    />
                    <Typography>Active</Typography>
                </FormControl>
                {showError && (
                    <Typography color="danger" sx={{ mb: 2 }}>
                        {showError}
                    </Typography>
                )}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px',
                    }}
                >
                    <Button variant="outlined" color="neutral" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={isEditMode ? onUpdate : onSave}
                    >
                        {isEditMode ? 'Update' : 'Save'}
                    </Button>
                </div>
            </ModalDialog>
        </Modal>
    );
}
