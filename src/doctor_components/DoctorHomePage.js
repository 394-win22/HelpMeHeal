import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStore from '../Store';
import calculateDay from '../utilities/calculateday';
import { maxHeight } from '@mui/system';
import { connectStorageEmulator } from 'firebase/storage';

const DoctorHomePage = ({ username, data, googleUser, setpatientInfo }) => {
    const setPage = useStore(state => state.setDoctorPage);
    const [tablePage, setTablePage] = useState(0);
    const [rowsPerTablePage, setRowsPerTablePage] = useState(5);
    const patientDict = data["user"][googleUser?.uid]["patientId"] ? data["user"][googleUser?.uid]["patientId"] : null;

    const patientsInfo = patientDict ? Object.keys(patientDict).map(key => data["user"][key]) : null;

    const handleChangePage = (event, newPage) => {
        setTablePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerTablePage(+event.target.value);
        setTablePage(0);
    };

    const showPatientDetailPage = (patientInfo) => {
        // set page
        //console.log(patientInfo);
        setpatientInfo(patientInfo);
        setPage("PatientDetail");
    }

    const TableContainerStyle = {
        width: "80%",
        margin: "0 auto",
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#b43434",
            color: "white",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const concernRow = (user) => {
        const currDate = calculateDay(user.startDate);
        console.log("c", currDate);

        if (user.surveyResults && user.surveyResults.length === currDate) {
            //console.log("k",Math.max(user.surveyResults.filter(n=>n).map));
            if (user.surveyResults[currDate - 1].concerns) {
                return "Yes";
            }
            else {
                return "No";
            }
        }
        else {
            return "N/A" // maybe change in future
        }
    }

    return (

        <div style={{ width: '55%', marginLeft: '23%', marginBottom: "10%" }}>
            <div style={{ color: '#b43434', fontSize: 25, marginBottom: '4rem', marginTop: '4rem' }}>
                <h2 style={{ textAlign: 'left' }}> Welcome back Doctor {username ? username : "Nobody"}, </h2>
            </div>
            {patientDict ?
                <Paper sx={TableContainerStyle}>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">SurgeryType</StyledTableCell>
                                    <StyledTableCell align="right">Status</StyledTableCell>
                                    <StyledTableCell align="right">Concerns</StyledTableCell>
                                    {/* <StyledTableCell align="right">Concer</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patientsInfo.slice(tablePage * rowsPerTablePage, tablePage * rowsPerTablePage + rowsPerTablePage)
                                    .map((patientInfo) => (
                                        <StyledTableRow hover key={patientInfo.email} onClick={() => showPatientDetailPage(patientInfo)}>
                                            <StyledTableCell component="th" scope="row">
                                                {patientInfo.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{patientInfo.surgeryType.toUpperCase()}</StyledTableCell>
                                            <StyledTableCell align="right">dummy</StyledTableCell>
                                            <StyledTableCell align="right">{concernRow(patientInfo)}</StyledTableCell>
                                            {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={patientsInfo.length}
                        rowsPerPage={rowsPerTablePage}
                        page={tablePage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper> : "You have no patient yet!"}
        </div>
    );
}

export default DoctorHomePage;