import Grow from "@mui/material/Grow";
import { Chart } from "react-chartjs-2";
import React from "react";

const PatientGraphs = (patientInfo) => {
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

    if (patientInfo.patientInfo.surveyResults) {
        Object.entries(patientInfo.patientInfo.surveyResults).map((surveyResult) => painData.push(surveyResult[1].pain_rating));
    }

    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div style={{ width: "50%", height: "30%", margin: "0 auto", marginBottom: '10rem' }}>
                <Chart type='bar' options={options} data={data} />
            </div>
        </Grow>
    )
}

export default PatientGraphs;