import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

const MailTo = ({ mailto, label }) => {
    return (
        <Button onClick ={() => window.location = 'mailto:helpmeheal.project@gmail.com'}>Contact your doctor</Button>
    );
};

// once we store doctor's email address in the database we can have that be the mailto address 
// also do we want this to be a logo or is that not intuitive enough

export default MailTo;