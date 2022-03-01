import Grow from '@mui/material/Grow';

const Welcome = ({ username, surgeryType, firebaseData, activeIndex, currentDay, daysDict, phaseEndDay }) => {
    let daysHasMessage;

    for (const [key,] of Object.entries(daysDict)) {
        if (currentDay >= key) {
            daysHasMessage = key
        }
    }

    const progressComplete = currentDay >= phaseEndDay[Object.entries(phaseEndDay).length];

    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div style={{ width: '55%', marginLeft: '23%' }}>
                <div style={{ color: '#b43434', fontSize: 25, marginBottom: '4rem', marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'left' }}> Welcome back {username ? username : "Nobody"}, </h2>
                </div>

                <div style={{ textAlign: 'left', fontSize: '1.9rem' }}>
                    Today you are on <b>phase {activeIndex}, day {progressComplete
                        ? phaseEndDay[Object.entries(phaseEndDay).length]
                        : currentDay}</b> of your ACL recovery. <br /> <br />
                    {Object.entries(firebaseData.surgery) // First: entry 'ACL'
                        .filter(data => data[0] === surgeryType)
                        .map(data => {
                            return (Object.entries(data[1].days) // Second: entry phase
                                .filter(days => days[0] === daysHasMessage)
                                .map((msg, i) => {
                                    return (
                                        <span key={i}>{msg[1].message}</span>
                                    )
                                })
                            )
                        }

                        )
                    } <br /> <br />
                    Remember to take the daily survey to ensure your recovery is on track.
                </div>
            </div>
        </Grow>
    )
}

export default Welcome;