import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import { SwitchDay } from './SwitchDay'
import PatientGraphs from "./PatientGraphs";
import ToDoList from "./ToDoList";

const HomePage = ({ activeIndex, data, currentDay, surgeryType, name, isMobile, setCurrentDay, setZoom, zoom, user, setPage, surveyCheck, videoCheck }) => {

    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}
            <ProgressIndicator phase={activeIndex} currentDay={currentDay} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} isMobile={isMobile} setZoom={setZoom} zoom={zoom} />
            <SwitchDay currentDay={currentDay} setCurrentDay={setCurrentDay} isMobile={isMobile} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <Welcome phase={activeIndex} username={name} surgeryType={surgeryType} firebaseData={data} currentDay={currentDay} daysDict={data["surgery"][surgeryType]["days"]} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <ToDoList setPage={setPage} surveyCheck={surveyCheck} videoCheck={videoCheck} />
            <PatientGraphs patientInfo={user} />
        </div>
    )

}

export default HomePage;