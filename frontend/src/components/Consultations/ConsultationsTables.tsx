/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TextField, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import api from '../../api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Consultation {
    id: string;
    consultation_date: string;
    consultation_type: string;
    consultation_summary?: string;
    patient_name: string;
}

interface Column {
    id: 'patient_name' | 'consultation_date' | 'consultation_type' | 'consultation_summary';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'patient_name', label: 'Patient Name', minWidth: 170 },
    { id: 'consultation_date', label: 'Consultation Date', minWidth: 170 },
    { id: 'consultation_type', label: 'Consultation Type', minWidth: 170 },
    { id: 'consultation_summary', label: 'Consultation Summary', minWidth: 170 },
];

export default function ConsultationsTable() {
    const [consultations, setConsultations] = React.useState<Consultation[]>([]);
    const [filteredConsultations, setFilteredConsultations] = React.useState<Consultation[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await api.get('/consultations/get-all-consultations');
                setConsultations(response.data.consultations);
                setFilteredConsultations(response.data.consultations);
            } catch (error: any) {
                console.error('Error fetching consultations:', error);
                toast.error('Error fetching consultations, please reload the page');
            }
        };

        fetchConsultations();
    }, []);

    React.useEffect(() => {
        const result = consultations.filter((consultation) =>
            consultation.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.consultation_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.consultation_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (consultation.consultation_summary && consultation.consultation_summary.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredConsultations(result);
    }, [searchQuery, consultations]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TextField
                label="Search Consultations"
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
                sx={{ margin: 2 }}
            />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredConsultations.length > 0 ? (
                            filteredConsultations
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography variant="body1">No consultations found.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredConsultations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ToastContainer />
        </Paper>
    );
}