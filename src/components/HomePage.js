import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';

const HomePage = ({data, user, setPage, activeIndex, setActiveIndex}) => {

    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}
            <Welcome user={user} firebaseData={data} activeIndex={activeIndex} startdate={data["user"][0]["startDate"]} />
            <ProgressIndicator setActiveIndex={setActiveIndex} startdate={data["user"][0]["startDate"]} phaseEndDay={data["surgery"]["acl"]["phaseEndDay"]} />
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