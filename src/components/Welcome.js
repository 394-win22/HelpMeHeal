import Grow from '@mui/material/Grow';
import { setData } from '../utilities/firebase';
import swal from 'sweetalert';
import Button from "@mui/material/Button";
import "./Welcome.css"
const Welcome = ({ phase, username, surgeryType, firebaseData, currentDay, daysDict, phaseEndDay, isMobile }) => {
    let daysHasMessage;

    for (const [key,] of Object.entries(daysDict)) {
        if (currentDay >= key) {
            daysHasMessage = key
        }
    }

    const popupWelcomeMsg = () => {
        let welcomeMsg = '';
        Object.entries(firebaseData.surgery) // First: entry 'ACL'
            .filter(data => data[0] === surgeryType)
            .map(data => {
                return (Object.entries(data[1].days) // Second: entry phase
                    .filter(days => days[0] === daysHasMessage)
                    .map((msg) => {
                        welcomeMsg = msg[1].message
                    })
                )
            })
        swal({
            title: `Welcome Back ${username ? username : "Nobody"}!`,
            text: welcomeMsg
        })
    }

    const buttonStyle = (isMobile) => ({
        mx: 2,
        fontSize: isMobile ? '3vw' : "0.8rem",
        width: isMobile ? '12vw' : '10rem',
        margin: '1%',
        bgcolor: "#b43434",
        borderRadius: 2,
        color: "rgb(255, 255, 255)",
        '&:hover': {
            bgcolor: "#b36464"
        },
        '&:focus': {
            bgcolor: "#b36464"
        },
    })

    const progressComplete = currentDay >= phaseEndDay[Object.entries(phaseEndDay).length];
    let isFirstLogin = (localStorage.getItem("lastLoginDay") === null || localStorage.getItem("lastLoginDay") !== currentDay.toString()) ? true : false;
    if (isFirstLogin === true) {
        //Better to use a modal instead of using swal?
        popupWelcomeMsg();
        localStorage.setItem("lastLoginDay", currentDay);
    }
    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div style={{ width: '55%', marginLeft: '23%' }}>
                <div style={{ color: '#b43434', fontSize: 25, marginBottom: '4rem', marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'left' }}> Welcome back {username ? username : "Nobody"}, </h2>
                </div>

                <div style={{ textAlign: 'left', fontSize: '1.9rem' }}>
                    Today you are on <b>phase {phase}, day {progressComplete
                        ? phaseEndDay[Object.entries(phaseEndDay).length]
                        : currentDay}</b> of your ACL recovery. <br /> <br />
                    Remember to take the daily survey to ensure your recovery is on track.
                    <br /><br />
                </div>
                <Button sx={() => buttonStyle(isMobile)} onClick={() => { popupWelcomeMsg() }} >Welcome Message</Button>
            </div>
        </Grow>)
}

export default Welcome;