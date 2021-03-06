import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';

//Name, description, photo, location, contact
const MailTo = ({ toEmail, show, handleClose, user, isMobile }) => {
    const [validFromEmail, setValidFromEmail] = useState(true);
    const [validMessage, setValidMessage] = useState(true);
    const spacing = 2;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? 280 : 400,
        bgcolor: 'background.paper',
        backgroundSize: "50% 50%",
        backgroundPosition: 'center', /* Center the image */
        backgroundRepeat: 'no-repeat', /* Do not repeat the image */
        border: '0px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const ContactUs = (toEmail, handleClose) => {
        const fromEmail = document.querySelector('#fromEmail').value;
        const message = document.querySelector('#message').value;
        const params = {
            "to_email": toEmail,
            "from_email": fromEmail,
            "message_html": message,
        };

        if (toEmail?.length > 0 && fromEmail?.length > 0 && validateEmail(fromEmail) && message?.length > 0) {
            //send(service ID, Template ID, Template params, UserID) get more information from emailjs plz.
            emailjs.send('Fake-service ID', 'Fake-Template ID', params, 'Fake-userId')
                .then((result) => {
                    swal("Message received!", "Will Reply Back Soon..", "success");
                }, (error) => {
                    swal("Failed", "Please try again in sometime..", "error");
                });
            handleClose()
        }

        setValidFromEmail(fromEmail?.length > 0 && validateEmail(fromEmail));
        setValidMessage(message?.length > 0);
    };

    return (
        <Modal
            id="emailModal"
            open={show}
            onClose={() => {
                handleClose();
                setValidFromEmail(true);
                setValidMessage(true);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center", marginBottom: 10 }}>
                    {user.userType === "doctor" ? "Email Your Patient Now" : "Email Your Doctor Now"}
                </Typography>

                <Stack spacing={spacing}>
                    <TextField id='fromEmail'
                        label="From Email"
                        name='from_email'
                        variant="outlined"
                        defaultValue={user ? user.email : ""}
                        required
                        helperText='Must be valid email'
                        error={!validFromEmail} />
                    <TextField id='toEmail'
                        label={user.userType === "doctor" ? "Patient Email" : "Doctor Email"}
                        name='to_email'
                        variant="outlined"
                        defaultValue={toEmail ? toEmail : ""}
                        required
                        disabled
                        helperText='Must be valid email'
                        error={!validFromEmail} />
                    <TextField id='message'
                        label="Message"
                        name='msg'
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="What is your concern?"
                        required
                        helperText="Cannot be blank"
                        error={!validMessage} />
                </Stack>

                <Box textAlign="right">
                    <Button id="submit" sx={{ mt: spacing }} size="small" variant="outlined" onClick={() => ContactUs(toEmail, handleClose)}>
                        Submit
                    </Button>
                    <Button id="close" sx={{ mt: spacing, marginLeft: "5%" }} size="small" variant="outlined" onClick={() => handleClose()}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default MailTo;
// once we store doctor's email address in the database we can have that be the mailto address
// also do we want this to be a logo or is that not intuitive enough