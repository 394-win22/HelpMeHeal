import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import { SwitchDay } from './SwitchDay'
import PatientGraphs from "./PatientGraphs";
import ToDoList from "./ToDoList";

const HomePage = ({activeIndex, setActiveIndex, data, currentDay, surgeryType, name, isMobile, setCurrentDay, setZoom, zoom, user, setPage}) => {

    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}

            <ProgressIndicator activeIndex={activeIndex} setActiveIndex={setActiveIndex} currentDay={currentDay} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} isMobile={isMobile} setZoom={setZoom} zoom={zoom}/>
            <SwitchDay currentDay={currentDay} setCurrentDay={setCurrentDay} isMobile={isMobile} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <Welcome activeIndex={activeIndex} username={name} surgeryType={surgeryType} firebaseData={data} currentDay={currentDay} daysDict={data["surgery"][surgeryType]["days"]} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <ToDoList setPage={setPage}/>
            <PatientGraphs patientInfo={user}/>
        </div>
    )

}

export default HomePage;