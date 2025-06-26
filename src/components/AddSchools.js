import { FormControl,Input,Stack, Modal, ModalClose, ModalDialog,
     Select,
     Option,
     Typography,
     Button,
 } from "@mui/joy";


export default function AddSchools({
    show, onClose, OnSave,
  scDfeNo,
  setScDfeNo,
  scFundingType,
  setScFundingType,
  scName,
  setScName,
  scReferenceNo,
  setScReferenceNo,
  scPhase,
  setScPhase,
  scFullTimeWeek,
  setScFullTimeWeek,
  scNonGrammer,
  setScNonGrammer,
  scEarlyFunding,
  setScEarlyFunding,
  Error,
  IsEdit,
  OnUpdate,
  headerText,
}){
   

    return(
       <Modal
         open={show}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    onClose(event, reason);
                }
  }}
        
       >
        <ModalDialog 
         layout="center"
         size="lg"
         variant="soft"
         sx={{ width: '800px', maxWidth: '90%' }}
         >
        <ModalClose />
                <Typography level="h5" component="h2" mb={2}>
                    {headerText}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flex: 1 }}>
                        <Input placeholder="DFE No"
                        value={scDfeNo}
                        onChange={(e) => setScDfeNo(e.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <Select
                            placeholder="Funding Type"
                           value={scFundingType}
                           onChange={(e,newValue) => setScFundingType(newValue)}
                        >
                            <Option value="Government">Government</Option>
                            <Option value="Private">Private</Option>                          
                        </Select>
                    </FormControl>                   
                </Stack>     
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flex: 1 }}>
                        <Input placeholder="Name" 
                        value={scName}
                        onChange={(e) => setScName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <Input placeholder="Reference No"
                        value={scReferenceNo}
                        onChange={(e) => setScReferenceNo(e.target.value)}
                        />
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flex: 1 }}>
                        <Select
                            placeholder="Phase"
                           value={scPhase}
                           onChange={(e,newValue) => setScPhase(newValue)}
                        >
                            <Option value="Special">Special</Option>
                            <Option value="Nursary">Nursary</Option>
                             <Option value="Primary">Primary</Option>
                              <Option value="Secondary">Secondary</Option>
                              <Option value="PRU">PRU</Option>                          
                        </Select>
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <Input placeholder="Full Time Week"
                          value={scFullTimeWeek}
                          onChange={(e) => setScFullTimeWeek(e.target.value)}
                         />
                    </FormControl>
                </Stack>
             <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                   <Select
                          placeholder="Non Grammer"
                          value={scNonGrammer}
                           onChange={(e,newValue) => setScNonGrammer(newValue)}
                           
                        >
                            <Option value="Grammer">Grammer</Option>
                            <Option value="NonGrammer">Non Grammer</Option>                          
                        </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                   <Select
                          placeholder="Early Funding"
                           value={scEarlyFunding}
                           onChange={(e,newValue)=> setScEarlyFunding(newValue)}
                        >
                            <Option value="Nursary">Nursary</Option>
                             <Option value="PrimarNursaryy">Primary Nursary</Option>
                             <Option value="SpecialNursary">Special Nursary</Option>                          
                        </Select>
                </FormControl>                    
             </Stack>
             <Stack direction="row" spacing={2}>
                {/* Error Message */}
                    {Error && (
                        <Typography color="danger" level="body2">
                            <b>{Error}</b>
                        </Typography>
                    )}
             </Stack>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button color="neutral" onClick={onClose}>Close</Button>
                <Button color="primary" onClick={IsEdit ? OnUpdate : OnSave}>Save</Button>
            </Stack>
                
       </ModalDialog>
      </Modal>
    )
}