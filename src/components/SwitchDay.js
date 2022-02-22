import Button from "@mui/material/Button";

const buttonStyle = (isMobile) => ({
    mx: 2,
    width: isMobile ? '20vw' : '6rem',
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


export const SwitchDay = ({ currentDay, setCurrentDay, isMobile }) => {
    const NextDayButton = () => (
        <Button sx={() => buttonStyle(isMobile)} onClick={() => setCurrentDay(currentDay + 1)}> Next Day </Button>);

    const PrevDayButton = () => (
        <Button sx={() => buttonStyle(isMobile)} onClick={() => {
            if (currentDay > 1) {
                setCurrentDay(currentDay - 1);
            }
        }}> Prev. Day </Button>
    );
    return (
        <div className="nextPrevDay">
            <PrevDayButton/>
            <NextDayButton/>
        </div>);
};
