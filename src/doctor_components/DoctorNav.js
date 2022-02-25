import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import MailTo from '../components/emailWidget';

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
    marginLeft: "1rem",
    marginRight: "1rem"
}

const DoctorNavBar = ({ setPage, user }) => {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const handleShowEmailFormClose = () => setShowEmailForm(false);
    return (
        <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 2, marginTop: '2rem' }}>
            <Button onClick={() => setPage("DoctorHome")} style={{ marginLeft: "5rem" }}>
                <HomeIcon sx={IconStyle} />
            </Button>
            <Button onClick={() => setShowEmailForm(true)}>
                <EmailIcon sx={IconStyle} />
            </Button>
            <MailTo show={showEmailForm} handleClose={handleShowEmailFormClose} user={user} />
        </AppBar>
    )
}

export default DoctorNavBar;