import Button from "@mui/material/Button";
import Grow from '@mui/material/Grow';

const buttonStyle = (isMobile) => ({
    mx: 2,
    fontSize: "0.8rem",
    width: '10rem',
    margin: '1%',
    bgcolor: "#b43434",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
})


export const SwitchDay = ({ currentDay, setCurrentDay, isMobile, phaseEndDay }) => {
    const NextDayButton = () => (
        <Button sx={() => buttonStyle(isMobile)} onClick={() => {
            currentDay < phaseEndDay[Object.entries(phaseEndDay).length] && setCurrentDay(currentDay + 1)

        }}> Next Day </Button>);

    const PrevDayButton = () => (
        <Button sx={() => buttonStyle(isMobile)} onClick={() => {
            if (currentDay > 1) {
                setCurrentDay(currentDay - 1);
            }
        }}> Prev. Day </Button>
    );
    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div className="nextPrevDay">
                <PrevDayButton />
                <NextDayButton />
            </div>
        </Grow>
    );
};
