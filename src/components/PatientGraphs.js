import Grow from "@mui/material/Grow";
import { Chart, Doughnut } from "react-chartjs-2";
import React from "react";

const PatientGraphs = ({ patientInfo, isMobile }) => {
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
                text: 'Weekly Report',
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

    const rehabData = {
        labels: ["Yes", "No"],
        datasets: [
            {
                data: rehabSuccessData,
                backgroundColor: ["green", 'rgba(255, 99, 132)'],
            }
        ],
    };

    if (patientInfo.surveyResults) {
        Object.entries(patientInfo.surveyResults).map(([, value]) => painData.push(value.pain_rating))
        Object.entries(patientInfo.surveyResults).map(([, value]) => {
            if (value.rehab_successful === 'Yes') {
                rehabSuccessData[0] += 1;
            } else {
                rehabSuccessData[1] += 1;
            }
        })
    }

    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div className="Graph">
                <div style={isMobile ?
                    { width: "100%", height: "30%", margin: "5% 15% 7% 0%", float: "left" } :
                    { width: "40%", height: "30%", margin: "5% 10% 7% 14%", float: "left" }}>
                    <Chart type='bar' options={options} data={data} />
                </div>
                <div style={isMobile ?
                    { width: "100%", height: "30%", margin: "5% 15% 7% 0", float: "left" } :
                    { width: "20%", height: "30%", margin: "5% 15% 7% 0", float: "left" }}>
                    <Doughnut data={rehabData} options={optionsRehab} />
                </div>
            </div>
        </Grow>
    )
}

export default PatientGraphs;