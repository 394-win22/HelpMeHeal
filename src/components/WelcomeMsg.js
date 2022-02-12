import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const WelcomeMsg = ({ open, setOpen, progress }) => {
    return (
        <div>
            <Snackbar open={open}
                      autoHideDuration={3000}
                      onClose={() => setOpen(false)}
                      anchorOrigin={{horizontal: "center", vertical:"top"}}>
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    <AlertTitle>Welcome to HelpMeHeal!</AlertTitle>
                    Please log in to post.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default WelcomeMsg;