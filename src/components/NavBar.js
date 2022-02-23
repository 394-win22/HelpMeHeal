import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import MailTo from './emailWidget';

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

const NavBar = ({ data, setPage, user }) => {
    const doctorEmail = data["user"][user.doctorId]["email"];
    const [showEmailForm, setShowEmailForm] = useState(false);
    const handleShowEmailFormClose = () => setShowEmailForm(false);
    return (
        <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 2 }}>
            <Button onClick={() => setShowEmailForm(true)}>
                <EmailIcon sx={IconStyle} />
            </Button>
            <MailTo toEmail={doctorEmail} show={showEmailForm} handleClose={handleShowEmailFormClose} user={user} />
            <Button onClick={() => setPage("home")} style={{ marginLeft: "5rem" }}>
                <HomeIcon sx={IconStyle} />
            </Button>
            <Button onClick={() => setPage("survey")} style={{ marginLeft: "5rem" }}>
                <FactCheckIcon sx={IconStyle} />
            </Button>
            <Button onClick={() => setPage("playVideo")} style={{ marginLeft: "5rem" }}>
                <PlayCircleFilledWhiteIcon sx={IconStyle} />
            </Button>
        </AppBar>
    )
}

export default NavBar;