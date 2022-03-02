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
import "./toDoList.css";
const ToDoList = ({ setPage, surveyCheck, videoCheck }) => {
    return (
        <div className="toDoList">
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: "rgb(243, 245, 247)", borderRadius: "2rem" }}
                subheader={<ListSubheader sx={{ bgcolor: "rgb(243, 245, 247)", borderRadius: "2rem" }}> To Do List </ListSubheader>}
            >
                <ListItem>
                    <Checkbox disabled checked={surveyCheck} />
                    <ListItemText id="switch-list-label-survey" primary="Survey" />
                    <ListItemIcon>
                        <Button onClick={() => setPage("survey")}>
                            <FactCheckIcon />
                        </Button>
                    </ListItemIcon>
                </ListItem>
                <ListItem>
                    <Checkbox disabled checked={videoCheck} />
                    <ListItemText id="switch-list-label-survey" primary="Video" />
                    <ListItemIcon>
                        <Button onClick={() => setPage("playVideo")}>
                            <PlayCircleFilledWhiteIcon />
                        </Button>
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>
    )
}

export default ToDoList;