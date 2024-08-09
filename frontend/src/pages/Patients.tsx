import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PatientForm from '../components/Patients/PatientForm';
import CollapsibleTable from '../components/Patients/AllPatients';
import { ToastContainer } from "react-toastify";

const Patients: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <div className=' mb-16'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add a New Patient
                </Button>
            </div>
            <CollapsibleTable />
            <PatientForm open={open} handleClose={handleClose} />
            <ToastContainer />
        </div>
    );
};

export default Patients;