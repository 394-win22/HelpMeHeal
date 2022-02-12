import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));




function BorderLinearProgress({completed, total}) {
    // DEBUG LOGS
    // console.log(completed)
    // console.log(total)
    // console.log(Math.round(completed / total * 100))
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <StyledLinearProgress variant="determinate" value={Math.round(completed / total * 100)} />
    </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(completed / total * 100,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}



export default function LinearWithValueLabel() {

  // We need to fetch these real-time from firebase once we decide on
  // on how we are going to calculate the progress
  const [itemsCompleted, setCompleted] = React.useState(20);
  const [totalItems, setTotalItems] = React.useState(30);


  return (
    <Box sx={{ width: '80%' }}>
      <BorderLinearProgress completed={itemsCompleted} total={totalItems} />
     </Box>
  );
}
