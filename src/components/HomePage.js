import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';

const buttonStyle = {
    fontWeight: "normal",
    color: 'white',
    fontSize: '1.5rem',
    marginLeft: "5rem",
    borderRadius: 2,
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
}

const IconStyle = {
    color: 'white',
    fontSize: '2.7rem',
    borderRadius: 2,
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
}

const HomePage = ({ data, name, surgeryType, setPage, activeIndex, setActiveIndex, }) => {

    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}
            <Welcome username={name} surgeryType={surgeryType} firebaseData={data} activeIndex={activeIndex} startdate={data["user"][0]["startDate"]} daysDict={data["surgery"][surgeryType]["days"]} />
            <ProgressIndicator setActiveIndex={setActiveIndex} startdate={data["user"][0]["startDate"]} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <Box>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 2 }}>
                    <Button onClick={() => window.location = 'mailto:helpmeheal.project@gmail.com'}>
                        <EmailIcon sx={IconStyle}/>
                    </Button>
                    <Button onClick={() => setPage("survey")} sx={buttonStyle}>
                        survey
                    </Button>
                </AppBar>
            </Box>

        </div>
    )

}

export default HomePage;