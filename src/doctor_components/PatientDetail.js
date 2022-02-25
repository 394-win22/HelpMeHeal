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
import { Chart } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    ChartConfiguration,
    LineController,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const PatientDetail = (patientInfo) => {

    const [tablePage, setTablePage] = useState(0);
    const [rowsPerTablePage, setRowsPerTablePage] = useState(5);
    var painData = [];

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
        scales: {
            y: {
                min: -1,
                max: 11,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 3,
                }
            }
        }
    };

    const labels = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'];

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Pain Level Line',
                data: painData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                cubicInterpolationMode: 'monotone',
                fill: true,
            },
            {
                type: 'bar',
                label: 'Pain Level Bar',
                data: painData,
                borderColor: 'rgb(53, 162, 235, 0.5)',
                backgroundColor: 'rgb(53, 162, 235, 0.5)',
                borderRadius: 5,
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
    // handle the graph

    // obtain pain level of each patient
    if (patientInfo.patientInfo.surveyResults) {
        patientInfo.patientInfo.surveyResults.map((surveyResult) => painData.push(surveyResult.pain_rating));
    }

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
                    <b style={{ margin: "0 auto", fontSize: "26px", paddingTop: "1rem", paddingBottom: "1rem" }}>Survey Results </b>

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
                                            .map((surveyResult, i) => (
                                                <StyledTableRow hover key={"surveyResult" + i}>
                                                    <StyledTableCell key={"pain_rating" + i} component="th" scope="row">
                                                        {surveyResult.pain_rating}
                                                    </StyledTableCell>
                                                    <StyledTableCell key={"rehab" + i} align="right">{surveyResult.rehab_successful}</StyledTableCell>
                                                    <StyledTableCell key={"concerns" + i} align="right">{surveyResult.concerns}</StyledTableCell>
                                                    {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                                                </StyledTableRow>
                                            ))
                                    }
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
                </div> : <div style={{ textAlign: "center", marginTop: "10px" }}><strong>No survey Result yet!</strong></div>
            }

            <div style={{ width: "50%", height: "30%", margin: "0 auto", marginBottom: '5rem' }}>
                <Chart type='bar' options={options} data={data} />
            </div>
        </div>
    )
}

export default PatientDetail