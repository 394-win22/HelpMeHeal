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
import { Chart, Doughnut } from 'react-chartjs-2';
import Grow from '@mui/material/Grow';
import calculateDay from '../utilities/calculateday';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const lengthOfpatientInfo = (patientInfo) => {
    let count = 0;
    Object.entries(patientInfo.surveyResults).forEach(([, value]) => {
        if (value) {
            count++;
        }
    })
    return count;
}
const PatientDetail = ({ patientInfo, isMobile }) => {
    const currentDay = calculateDay(patientInfo.startDate)
    const [tablePage, setTablePage] = useState(0);
    const [rowsPerTablePage, setRowsPerTablePage] = useState(5);
    var painData = [];
    var rehabSuccessData = [0, 0];
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

    const optionsRehab = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Past Week Rehab Success',
                font: {
                    size: 26,
                },
                padding: {
                    top: 30,
                    bottom: 15
                }
            },
        }
    }


    const labels = [];

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

    const rehabData = {
        labels: ["Yes", "No"],
        datasets: [
            {
                data: rehabSuccessData,
                backgroundColor: ["green", 'rgba(255, 99, 132)'],
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
    if (patientInfo.surveyResults) {
        let lastday = 0;
        let isFirstDayOfWeek = true;
        Object.entries(patientInfo.surveyResults).forEach(([key, value]) => {
            if (currentDay - parseInt(key) - 1 < 7) {
                if (isFirstDayOfWeek) {
                    lastday = parseInt(key);
                    let startOfweek = currentDay - 7 >= 0 ? currentDay - 7 : 0;
                    for (let i = startOfweek; i < startOfweek + 7; i++) {
                        labels.push(`Day${i + 1}`)
                    }
                    for (let i = startOfweek; i < parseInt(key); i++) {
                        painData.push(null);
                    }
                    painData.push(value.pain_rating);
                    isFirstDayOfWeek = false;
                } else {
                    let diff = parseInt(key) - lastday;
                    if (diff > 1) {
                        for (let i = 1; i < diff; i++) {
                            painData.push(null);
                        }
                    }
                    painData.push(value.pain_rating);
                    lastday = parseInt(key);
                }
            }
        })
        Object.entries(patientInfo.surveyResults).forEach(([key, value]) => {
            if (currentDay - parseInt(key) - 1 < 7) {
                if (value.rehab_successful === 'Yes') {
                    rehabSuccessData[0] += 1;
                } else {
                    rehabSuccessData[1] += 1;
                }
            }
        })
    }

    return (
        <div>
            <Grow in={true} {...({ timeout: 1000 })}>
                <div>
                    <h2>{patientInfo.name}</h2>
                    <a href={"mailto:" + patientInfo.email}>{patientInfo.email}</a>
                    <h3>Current Day: Day {currentDay}</h3>
                </div>
            </Grow>

            <Grow in={true} {...({ timeout: 1500 })}>
                {patientInfo.surveyResults ?
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
                                            <StyledTableCell>Day</StyledTableCell>
                                            <StyledTableCell>Pain Level</StyledTableCell>
                                            <StyledTableCell align="right">Rehab Successful</StyledTableCell>
                                            <StyledTableCell align="right">Concerns</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(patientInfo.surveyResults).reverse().slice(tablePage * rowsPerTablePage, tablePage * rowsPerTablePage + rowsPerTablePage).map(([key, surveyResult]) => (
                                            <StyledTableRow hover key={"surveyResult" + key}>
                                                <StyledTableCell key={"day" + key} component="th" scope="row">
                                                    Day {parseInt(key) + 1}
                                                </StyledTableCell>
                                                <StyledTableCell key={"pain_rating" + key} component="th" scope="row">
                                                    {surveyResult.pain_rating}
                                                </StyledTableCell>
                                                <StyledTableCell key={"rehab" + key} align="right">{surveyResult.rehab_successful}</StyledTableCell>
                                                <StyledTableCell key={"concerns" + key} align="right">{surveyResult.concerns}</StyledTableCell>
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
                                count={patientInfo.surveyResults.length ? lengthOfpatientInfo(patientInfo) : 1}
                                rowsPerPage={rowsPerTablePage}
                                page={tablePage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div> : <div style={{ textAlign: "center", marginTop: "10px" }}><strong>No survey Result yet!</strong></div>
                }
            </Grow>

            <Grow in={true} {...({ timeout: 1500 })}>
                <div className="Graph" style={{ marginBottom: "10%" }}>
                    <div style={isMobile ?
                        { width: "90%", height: "90%", margin: "5% 5% 5% 5%", float: "left" } :
                        { width: "40%", height: "30%", margin: "5% 10% 15% 14%", float: "left" }}>
                        <Chart type='bar' options={options} data={data} />
                    </div>
                    <div style={isMobile ?
                        { width: "80%", height: "30%", margin: "5% 10% 7% 10%", float: "left" } :
                        { width: "20%", height: "30%", margin: "5% 15% 15% 0", float: "left" }}>
                        <Doughnut data={rehabData} options={optionsRehab} />
                    </div>
                </div>
            </Grow>

        </div>
    )
}

export default PatientDetail