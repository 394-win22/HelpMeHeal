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
import CreateFakePatient from './CreateFakePatient';
import ErrorIcon from '@mui/icons-material/Error';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';


const DoctorHomePage = ({ username, data, googleUser, setpatientInfo, isMobile }) => {
    const setPage = useStore(state => state.setDoctorPage);
    const [tablePage, setTablePage] = useState(0);
    const [rowsPerTablePage, setRowsPerTablePage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    let usernameFormatted = username?.split(/\s/);

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
        setpatientInfo(patientInfo);
        setPage("PatientDetail");
    }

    const TableContainerStyle = {
        width: isMobile ? "98%" : "80%",
        margin: "0 auto",
        borderRadius: "1rem",
        marginBottom: "2rem",
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#b43434",
            color: "white",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            cursor: "pointer",
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

        if (user.surveyResults && user.surveyResults.length === currDate) {
            //console.log("k",Math.max(user.surveyResults.filter(n=>n).map));
            if (user.surveyResults[currDate - 1].concerns) {
                return (<div style={{ color: '#b43434' }}>
                    <ErrorIcon sx={{ styleIcon }} />
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
            <Grow in={true} {...({ timeout: 1500 })}>
                <div style={{ color: '#b43434', fontSize: isMobile ? 20 : 25, marginBottom: isMobile ? '3rem' : '2rem', marginTop: isMobile ? '2rem' : '4rem' }}>
                    <h2 style={{ textAlign: 'center' }}> Welcome back Doctor {
                        usernameFormatted ? 
                        usernameFormatted?.[0].charAt(0).toUpperCase() + 
                        usernameFormatted?.[0].slice(1).toLowerCase() + 
                        " " +
                        usernameFormatted?.[1].charAt(0).toUpperCase() +
                        usernameFormatted?.[1].slice(1).toLowerCase(): "Nobody"}, 
                    </h2>
                </div>
            </Grow>
            {patientDict ?
                <Grow in={true} {...({ timeout: 1500 })}>
                    <Paper sx={TableContainerStyle}>
                        <div style={{ marginBottom: '2rem', float: 'right', marginRight: '2rem', width: '40%', marginTop: '2rem' }}>
                            <TextField
                                value={searchTerm}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(event) => { setSearchTerm(event.target.value) }}
                                sx={{ width: '100%' }}
                            />
                        </div>
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
                                    {patientsInfo.filter(patientInfo => patientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .slice(tablePage * rowsPerTablePage, tablePage * rowsPerTablePage + rowsPerTablePage)
                                        .map((patientInfo) => (
                                            <StyledTableRow hover key={patientInfo.email} onClick={() => showPatientDetailPage(patientInfo)}>
                                                <StyledTableCell component="th" scope="row">
                                                    {patientInfo.name.toUpperCase()}
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
                    </Paper>
                </Grow> : "You have no patient yet!"}

            <div style={{ marginBottom: '10rem' }}>
                <CreateFakePatient googleUser={googleUser} />
            </div>
        </div>
    );
}

export default DoctorHomePage;