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
import CreateFakePatient from './CreateFakePatient';
import ErrorIcon from '@mui/icons-material/Error';

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

    const styleIcon = {
        backgroundColor: "red"
    };

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
    };

    const statusIcon = (user) => {
        const currDate = calculateDay(user.startDate);
        console.log("c", currDate);

        if (user.surveyResults && user.surveyResults.length === currDate) {
            //console.log("k",Math.max(user.surveyResults.filter(n=>n).map));
            if (user.surveyResults[currDate - 1].concerns) {
                return (<div style={{color: '#b43434' }}>
                            <ErrorIcon sx={{styleIcon}}/>
                        </div>);
            }
            else {
                return " "
            }
        }
        else {
            return "N/A" // maybe change in future
        }
    };


    return (

        <div>
            <div style={{ color: '#b43434', fontSize: 25, marginBottom: '4rem', marginTop: '4rem' }}>
                <h2 style={{ textAlign: 'center' }}> Welcome back Doctor {username ? username : "Nobody"}, </h2>
                <CreateFakePatient googleUser={googleUser} />
            </div>
            {patientDict ?
                <Paper sx={TableContainerStyle}>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="center">SurgeryType</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">Concerns</StyledTableCell>
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
                                            <StyledTableCell align="center">{patientInfo.surgeryType.toUpperCase()}</StyledTableCell>
                                            <StyledTableCell align="center">{statusIcon(patientInfo)}</StyledTableCell>
                                            <StyledTableCell align="center">{concernRow(patientInfo)}</StyledTableCell>
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