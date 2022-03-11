import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import Button from '@mui/material/Button';
import Grow from "@mui/material/Grow";
import swal from 'sweetalert';
import "./toDoList.css";
import useStore from '../Store';

const ToDoList = ({ setPage, surveyCheck, isMobile }) => {
    const page = useStore(state => state.UserPage);
    const showPopupAlert = () => {
        swal({
            title: "Do you want to resubmit your survey?",
            text: "You have already filled in the survey today!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willresubmit) => {
                if (willresubmit) {
                    setPage("survey")
                }
            });
    }

    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div className="toDoList">
                <List
                    sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "10%", width: '100%', maxWidth: "80vw", bgcolor: "rgb(243, 245, 247)", borderRadius: "2rem" }}
                    subheader={<ListSubheader sx={{ bgcolor: "rgb(243, 245, 247)", borderRadius: "2rem" }}> To Do List </ListSubheader>}
                >
                    <ListItem>
                        <Checkbox disabled checked={surveyCheck} />
                        <ListItemText id="switch-list-label-survey" primary="Survey" />
                        <ListItemIcon>
                            <Button onClick={() => surveyCheck && page !== "survey" ? showPopupAlert() : setPage("survey")}>
                                <FactCheckIcon sx={{ color: '#b43434' }} />
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <Checkbox disabled checked={localStorage.getItem("videoCheck") === true.toString()} />
                        <ListItemText id="switch-list-label-survey" primary="Video" />
                        <ListItemIcon>
                            <Button onClick={() => setPage("playVideo")}>
                                <PlayCircleFilledWhiteIcon sx={{ color: '#b43434' }} />
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </div>
        </Grow>
    )
}

export default ToDoList;