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
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from '../FormValidation/TextInput';
import api from '../../api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PatientFormProps {
    open: boolean;
    handleClose: () => void;
}

interface PatientFormInputs {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number: string;
}

// Validation schema: either email or phone number is required
const schema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email'),
    phone_number: yup.string().required('Phone number is required'),
});

const PatientForm: React.FC<PatientFormProps> = ({ open, handleClose }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<PatientFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
        }
    });

    const onSubmit: SubmitHandler<PatientFormInputs> = async (data) => {
        try {
            await api.post("/patient/create-patient", data);
            reset();
            handleClose();
            window.location.reload()
        } catch (error: any) {
            console.log('Create patient error: ', error);
            toast.error(error.response.data.message || 'Please try again. An error occurred');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                reset(); // Clear the form when closing
                handleClose();
            }}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>Create New Patient</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create a new patient, please enter the patient's information here.
                </DialogContentText>

                <div className="flex flex-col gap-3 mt-8">
                    <TextInput name="first_name" control={control} label="First Name" error={errors.first_name} type="text" />
                    <TextInput name="last_name" control={control} label="Last Name" error={errors.last_name} type="text" />
                    <TextInput name="email" control={control} label="Email" error={errors.email} type="text" />
                    <TextInput name="phone_number" control={control} label="Phone Number" error={errors.phone_number} type="tel" />
                </div>
            </DialogContent>

            <DialogActions>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Create Patient
                </Button>
                <Button onClick={() => {
                    reset(); // Clear the form when closing
                    handleClose();
                }}>
                    Cancel
                </Button>
            </DialogActions>
            <ToastContainer />
        </Dialog>
    );
};

export default PatientForm;