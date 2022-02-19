import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import calculateDay from '../utilities/calculateday';

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


const HomePage = ({ data, currentDay, surgeryType, name, type, setPage, activeIndex, setActiveIndex}) => {


    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}
            <ProgressIndicator setActiveIndex={setActiveIndex} currentDay={currentDay} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <Welcome username={name} surgeryType={surgeryType} firebaseData={data} activeIndex={activeIndex} currentDay={currentDay} daysDict={data["surgery"][surgeryType]["days"]} />

            <Box>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 2 }}>
                    <Button onClick={() => window.location = 'mailto:helpmeheal.project@gmail.com'}>
                        <EmailIcon sx={IconStyle} />
                    </Button>
                    <Button onClick={() => setPage("survey")} style={{ marginLeft: "5rem" }}>
                        <FactCheckIcon sx={IconStyle} />
                    </Button>
                </AppBar>
            </Box>

        </div>
    )

}

export default HomePage;