import useStore from "../Store"
import Button from '@mui/material/Button';
const PatientDetail = () => {
    const setPage = useStore(state => state.setDoctorPage);
    const buttonStyle = {
        fontWeight: "normal",
        backgroundColor: "#b43434",
        color: 'white',
        fontSize: '1rem',
        padding: 1,
        borderRadius: 2,
        '&:hover': {
            bgcolor: "#b36464"
        },
        '&:focus': {
            bgcolor: "#b36464"
        },
    }
    return (
        <div>
            <div>PatientDetail</div>
            <Button onClick={() => {
                setPage("DoctorHome");
            }} sx={buttonStyle}>
                return
            </Button>
        </div>
    )
}

export default PatientDetail