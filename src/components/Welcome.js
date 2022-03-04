import Grow from '@mui/material/Grow';
import Swal from 'sweetalert2'
import Button from "@mui/material/Button";
import "./Welcome.css"
const Welcome = ({ phase, username, surgeryType, firebaseData, currentDay, daysDict, phaseEndDay, isMobile }) => {
    let daysHasMessage;
    let usernameFormatted = username?.split(/\s/);

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
                    .forEach((msg) => {
                        welcomeMsg = msg[1].message
                    })
                )
            })

        Swal.fire({
            customClass: {
                title: 'custom-title-class',
            },
            title: `<div style = 'color:white; padding-bottom: ${isMobile ? "8%" : "5%"}; ${isMobile ? "font-size: 6vw;" : null}'> Welcome back ${usernameFormatted ?
                usernameFormatted?.[0].charAt(0).toUpperCase() +
                usernameFormatted?.[0].slice(1).toLowerCase() +
                " " +
                usernameFormatted?.[1].charAt(0).toUpperCase() +
                usernameFormatted?.[1].slice(1).toLowerCase()
                : "Nobody"}!</div>`,
            text: welcomeMsg,
            width: 600,
            color: '#000',
            background: '#fff url(/images/trees.png)',
            showConfirmButton: true,
            confirmButtonColor: "#b43434",
            confirmButtonText: `I got this!`,
            backdrop: `
              rgba(123, 110, 11,0.08)
              left top
              no-repeat
            `,
        })

    }

    const buttonStyle = (isMobile) => ({
        mx: 2,
        fontSize: "0.8rem",
        width: '10rem',
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
        localStorage.setItem("videoCheck", false);
    }
    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div className="welcomeMsg">
                <div style={isMobile ? { color: '#b43434', fontSize: "3vw", marginBottom: '2vh', marginTop: '2vh' } : { color: '#b43434', fontSize: 25, marginBottom: '1rem', marginTop: '1rem' }}>
                    <h2 style={{ textAlign: 'left', paddingLeft: '10vw', paddingRight: '10vw' }}> Welcome back {usernameFormatted ?
                        usernameFormatted?.[0].charAt(0).toUpperCase() +
                        usernameFormatted?.[0].slice(1).toLowerCase() +
                        " " +
                        usernameFormatted?.[1].charAt(0).toUpperCase() +
                        usernameFormatted?.[1].slice(1).toLowerCase() : "Nobody"},
                    </h2>
                </div>

                <div style={{ textAlign: 'left', fontSize: isMobile ? "4vw" : '1.9rem', paddingLeft: '10vw', paddingRight: '10vw' }}>
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