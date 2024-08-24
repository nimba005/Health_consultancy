/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, MenuItem } from "@mui/material";
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../../api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ConsultationFormProps {
    open: boolean;
    handleClose: () => void;
    patientId: string; // Pass the patient_id from the patient table
}

interface ConsultationFormInputs {
    patient_id: string;
    consultation_date: string;
    consultation_type: string;
    consultation_summary?: string;
}

// Validation schema
const schema = yup.object().shape({
    patient_id: yup.string().required('Patient ID is required'), // Add patient_id to schema
    consultation_date: yup.string().required('Consultation date is required'),
    consultation_type: yup.string().required('Consultation type is required'),
    consultation_summary: yup.string(),
});

const ConsultationForm: React.FC<ConsultationFormProps> = ({ open, handleClose, patientId }) => {
    const { handleSubmit, formState: { errors }, reset, register } = useForm<ConsultationFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            patient_id: patientId, // Set the patient_id as a default value
            consultation_date: '',
            consultation_type: '', // Set the initial value to an empty string
            consultation_summary: '',
        }
    });

    const onSubmit: SubmitHandler<ConsultationFormInputs> = async (data) => {
        try {
            await api.post("/consultations/create-consultation", data); // No need to spread and override patient_id
            reset();
            handleClose();
            toast.success('Consultation created successfully');
            // window.location.reload();
        } catch (error: any) {
            toast.error(error.response.data.message || 'Please try again. An error occurred');
            console.log('Create consultation error: ', error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                reset();
                handleClose();
            }}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>Create New Consultation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create a new consultation, please enter the consultation details here.
                </DialogContentText>

                <div className="flex flex-col gap-3 mt-8">
                    <TextField
                        label="Consultation Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register('consultation_date')}
                        error={!!errors.consultation_date}
                        helperText={errors.consultation_date?.message}
                        fullWidth
                    />
                    <TextField
                        label="Consultation Type"
                        select
                        {...register('consultation_type')}
                        error={!!errors.consultation_type}
                        helperText={errors.consultation_type?.message}
                        fullWidth
                        defaultValue=""
                    >
                        <MenuItem value="Walk-in">Walk-in</MenuItem>
                        <MenuItem value="Website">Website</MenuItem>
                        <MenuItem value="Phone call">Phone call</MenuItem>
                        {/* Add more options as needed */}
                    </TextField>
                    <TextField
                        label="Consultation Summary"
                        {...register('consultation_summary')}
                        error={!!errors.consultation_summary}
                        helperText={errors.consultation_summary?.message}
                        fullWidth
                    />
                </div>
            </DialogContent>

            <DialogActions>
                <Button type="submit" variant="contained" color="primary">
                    Create Consultation
                </Button>
                <Button onClick={() => {
                    reset();
                    handleClose();
                }}>
                    Cancel
                </Button>
            </DialogActions>
            <ToastContainer />
        </Dialog>
    );
};

export default ConsultationForm;