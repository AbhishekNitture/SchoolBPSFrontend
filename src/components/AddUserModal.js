import React from 'react';
import {
    Modal,
    ModalDialog,
    ModalClose,
    Typography,
    Button,
    FormControl,
    Input,
    Checkbox,
    Select,
    Option,
    Stack,
} from '@mui/joy';
import { format } from 'date-fns';

export default function AddUserModal({
    showModal,
    onClose,
    onSave,
    title,
    login,
    surname,
    EmailId,
    firstname,
    expiredon,
    isActive,
    setTitle,
    setLogin,
    setSurname,
    setEmailId,
    setFirstname,
    setExpiredon,
    setIsActive,
    Error,
    headingtitle,
    IsEdit,
    onUpdate,
}) {
    if (!showModal) return null;

    const formattedExpiredon = expiredon ? format(new Date(expiredon), 'yyyy-MM-dd') : '';

    return (
        <Modal open={showModal} onClose={(event,reason)=>{
            if (reason !== "backdropClick"){
                onClose(event,reason);
            }
        }}>
            <ModalDialog layout="center" size="lg" variant="soft">
                <ModalClose />
                <Typography level="h5" component="h2" mb={2}>
                    {headingtitle}
                </Typography>

                <Stack spacing={2}>
                    {/* Title and Login Fields */}
                    <Stack direction="row" spacing={2}>
                        <FormControl sx={{ flex: 1 }}>
                            <Select
                                placeholder="Title"
                                value={title}
                                onChange={(e, newValue) => setTitle(newValue)}
                            >
                                <Option value="None">None</Option>
                                <Option value="Mr">Mr</Option>
                                <Option value="Mrs">Mrs</Option>
                                <Option value="Miss">Miss</Option>
                                <Option value="Dr">Dr</Option>
                                <Option value="Shri">Shri</Option>
                                <Option value="Mss">Mss</Option>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <Input
                                placeholder="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </FormControl>
                    </Stack>

                    {/* Surname and Email Fields */}
                    <Stack direction="row" spacing={2}>
                        <FormControl sx={{ flex: 1 }}>
                            <Input
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <Input
                                placeholder="Email Id"
                                value={EmailId}
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </FormControl>
                    </Stack>

                    {/* First Name and Expired On Fields */}
                    <Stack direction="row" spacing={2}>
                        <FormControl sx={{ flex: 1 }}>
                            <Input
                                placeholder="First Name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <Input
                                type="date"
                                placeholder="Expired On"
                                value={formattedExpiredon}
                                onChange={(e) => setExpiredon(e.target.value)}
                            />
                        </FormControl>
                    </Stack>

                    {/* Active Checkbox */}
                    <FormControl>
                        <Checkbox
                            label="Active"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    </FormControl>

                    {/* Error Message */}
                    {Error && (
                        <Typography color="danger" level="body2">
                            <b>{Error}</b>
                        </Typography>
                    )}
                </Stack>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                    <Button variant="outlined" color="neutral" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="solid" color="primary" onClick={IsEdit ? onUpdate : onSave}>
                        {IsEdit ? 'Update' : 'Save'}
                    </Button>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}
