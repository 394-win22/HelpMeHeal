import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import { SwitchDay } from './SwitchDay'


// const IconStyle = {
//     color: 'white',
//     fontSize: '2.7rem',
//     borderRadius: 2,
//     '&:hover': {
//         bgcolor: "#b36464"
//     },
//     '&:focus': {
//         bgcolor: "#b36464"
//     },
// }

const HomePage = ({ setActiveIndex, data, currentDay, surgeryType, name, activeIndex, isMobile, setCurrentDay }) => {

    // const doctorEmail = data["user"][user.doctorId]["email"];
    return (
        <div>

            {/* the zero bellow has to change userid as its real id later */}
            <ProgressIndicator phase={activeIndex} activeIndex={activeIndex} setActiveIndex={setActiveIndex} currentDay={currentDay} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} isMobile={isMobile} />
            <SwitchDay currentDay={currentDay} setCurrentDay={setCurrentDay} isMobile={isMobile} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <Welcome activeIndex={activeIndex} username={name} surgeryType={surgeryType} firebaseData={data} currentDay={currentDay} daysDict={data["surgery"][surgeryType]["days"]} phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />

            {/*<NavBar data={data} 
                    // showEmailForm={showEmailForm} 
                    // setShowEmailForm={setShowEmailForm} 
                    // handleShowEmailFormClose={handleShowEmailFormClose} 
                    setPage={setPage}
    user={user}/>*/}

        </div>
    )

}

export default HomePage;