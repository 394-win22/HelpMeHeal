import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import { SwitchDay } from './SwitchDay'


const HomePage = ({ setActiveIndex, data, currentDay, surgeryType, user, name, activeIndex, isMobile, setCurrentDay, setZoom, zoom, googleUser, isFirstLogin  }) => {

    return (
        <div>
            {/* the zero bellow has to change userid as its real id later */}

            <ProgressIndicator activeIndex={activeIndex} setActiveIndex={setActiveIndex} currentDay={currentDay} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} isMobile={isMobile} setZoom={setZoom} zoom={zoom}/>
            <SwitchDay currentDay={currentDay} setCurrentDay={setCurrentDay} isMobile={isMobile} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <Welcome activeIndex={activeIndex} username={name} surgeryType={surgeryType} user={user} firebaseData={data} currentDay={currentDay} daysDict={data["surgery"][surgeryType]["days"]} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} googleUser={googleUser} isFirstLogin={isFirstLogin}/>

        </div>
    )

}

export default HomePage;