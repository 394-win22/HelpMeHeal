import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import { SwitchDay } from './SwitchDay'
import ToDoList from "./ToDoList";
import "./HomePage.css"

const HomePage = ({ phase, data, currentDay, surgeryType, name, isMobile, setCurrentDay, setZoom, zoom, user, setPage, surveyCheck, videoCheck }) => {


    return (
        <div style={{ marginBottom: "10rem" }}>

            <div className="HomePage">
                <ProgressIndicator phase={phase} currentDay={currentDay} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} isMobile={isMobile} setZoom={setZoom} zoom={zoom} data={data} surgeryType={surgeryType} />
                <SwitchDay currentDay={currentDay} setCurrentDay={setCurrentDay} isMobile={isMobile} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
                <div className="wel-todo">
                    <Welcome phase={phase} username={name} surgeryType={surgeryType} firebaseData={data} currentDay={currentDay} daysDict={data["surgery"][surgeryType]["days"]} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} isMobile={isMobile} />
                    <ToDoList setPage={setPage} surveyCheck={surveyCheck} videoCheck={videoCheck} isMobile={isMobile} />
                </div>
            </div>
        </div>
    )

}

export default HomePage;