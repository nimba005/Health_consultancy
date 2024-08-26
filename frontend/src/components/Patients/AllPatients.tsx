/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../../api';
import { InputAdornment, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import ConsultationForm from '../Consultations/ConsultationForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

interface Consultation {
    id: string;
    consultation_date: string;
    consultation_type: string;
    consultation_summary: string;
}

interface RowProps {
    patient: Patient;
}

function Row({ patient }: RowProps) {
    const { id, first_name, last_name, email, phone_number } = patient;
    const [open, setOpen] = useState(false);
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchConsultations();
        }
    }, [open]);

    const fetchConsultations = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/consultations/patient-consultations/${id}`);
            setConsultations(response.data.consultations);
        } catch (error) {
            toast.error("Error fetching patient's consultation, please reload the page");
            console.error("Error fetching patient's consultation :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {first_name} {last_name}
                </TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{phone_number}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" onClick={() => setFormOpen(true)}>
                        Add Consultation
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Consultations
                            </Typography>
                            {loading ? (
                                <Typography>Loading...</Typography>
                            ) : consultations.length > 0 ? (
                                <Table size="small" aria-label="consultations">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Consultation Date</TableCell>
                                            <TableCell>Consultation Type</TableCell>
                                            <TableCell>Consultation Summary</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {consultations.map((consultation) => (
                                            <TableRow key={consultation.id}>
                                                <TableCell>{consultation.consultation_date}</TableCell>
                                                <TableCell>{consultation.consultation_type}</TableCell>
                                                <TableCell>{consultation.consultation_summary}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography>No consultations found for this patient.</Typography>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <ConsultationForm open={formOpen} handleClose={() => setFormOpen(false)} patientId={id} />
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await api.get('/patient/patients');
                const fetchedPatients = response.data.patients;
                setPatients(fetchedPatients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(patient => {
        const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    return (
        <div className='flex flex-col gap-8'>
            <TextField
                label="Search Patients"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPatients.map((patient) => (
                            <Row key={patient.id} patient={patient} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}