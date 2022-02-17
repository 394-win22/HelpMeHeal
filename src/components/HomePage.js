import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';

const HomePage = ({ data, name, type, setPage, activeIndex, setActiveIndex }) => {
    console.log(1, data)
    console.log(2, type)
    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}
            <Welcome username={name} surgeryType={type} firebaseData={data} activeIndex={activeIndex} startdate={data["user"][0]["startDate"]} daysDict={data["surgery"][type]["days"]} />
            <ProgressIndicator setActiveIndex={setActiveIndex} startdate={data["user"][0]["startDate"]} phaseEndDay={data["surgery"][type]["phaseEndDay"]} />
            <Box>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 3 }}>
                    <Button onClick={() => window.location = 'mailto:helpmeheal.project@gmail.com'}>
                        <EmailIcon style={{ color: 'white', fontSize: '2.7rem' }} />
                    </Button>
                    <Button onClick={() => {
                        setPage("survey");
                    }}

                        style={{
                            fontWeight: "normal",
                            color: 'white',
                            fontSize: '1.5rem',
                            marginLeft: "5rem",
                        }}>
                        survey
                    </Button>
                </AppBar>
            </Box>

        </div>
    )

}

export default HomePage;