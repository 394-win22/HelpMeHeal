import React, { useState } from 'react';
import useStore from "../Store"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PatientDetail = (patientInfo) => {

    const setPage = useStore(state => state.setDoctorPage);
    const [tablePage, setTablePage] = useState(0);
    const [rowsPerTablePage, setRowsPerTablePage] = useState(5);

    // handle the graph
    var painData = [];
    // obtain pain level of each patient
    {
        patientInfo.patientInfo.surveyResults.map((surveyResult) => painData.push(surveyResult.pain_rating));
        console.log(painData);
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                font: {
                    size: 26,
                },
            },
            title: {
                display: true,
                text: 'Patients Detail',
                font: {
                    size: 26,
                },
                padding: {
                    top: 30,
                    bottom: 15
                }
            },
        },
    };

    const labels = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Pain Level',
                data: painData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const handleChangePage = (event, newPage) => {
        setTablePage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerTablePage(+event.target.value);
        setTablePage(0);
    };

    const buttonStyle = {
        fontWeight: "normal",
        backgroundColor: "#b43434",
        color: 'white',
        fontSize: '1rem',
        padding: 1,
        marginTop: "2rem",
        borderRadius: 2,
        '&:hover': {
            bgcolor: "#b36464"
        },
        '&:focus': {
            bgcolor: "#b36464"
        },
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

    return (
        <div>
            <div>
                <h2>{patientInfo.patientInfo.name}</h2>
                <a href={"mailto:" + patientInfo.patientInfo.email}>{patientInfo.patientInfo.email}</a>
            </div>
            {patientInfo.patientInfo.surveyResults ?
                <div style={{
                    display: "flex", alignItems: "flex-start", flexDirection: "column", justifyContent: "flex-start",
                    marginTop: "3rem"
                }}>
                    <h3 style={{ marginLeft: "10%" }}>Survey Results </h3>

                    <Paper sx={TableContainerStyle}>
                        <TableContainer>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Pain Level</StyledTableCell>
                                        <StyledTableCell align="right">Rehab Successful</StyledTableCell>
                                        <StyledTableCell align="right">Concerns</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        patientInfo.patientInfo.surveyResults.slice(tablePage * rowsPerTablePage, tablePage * rowsPerTablePage + rowsPerTablePage)
                                            .map((surveyResult) => (
                                                <StyledTableRow hover key={surveyResult.key} >
                                                    <StyledTableCell component="th" scope="row">
                                                        {surveyResult.pain_rating}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{surveyResult.rehab_successful}</StyledTableCell>
                                                    <StyledTableCell align="right">{surveyResult.concerns}</StyledTableCell>
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
                            // first in array is empty, adjust for it in length
                            count={patientInfo.patientInfo.surveyResults.length - 1}
                            rowsPerPage={rowsPerTablePage}
                            page={tablePage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div> : <div style={{ textAlign: "center", marginTop: "10px" }}><strong>No survey Result yet!</strong></div>}

            <div style={{ width:"50%", height:"30%", margin:"0 auto"}}>
                <Line options={options} data={data} />
            </div>

            <Button onClick={() => {
                setPage("DoctorHome");
            }} sx={buttonStyle}>
                return
            </Button>
        </div>
    )
}

export default PatientDetail