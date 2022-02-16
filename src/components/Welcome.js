import calculateDay from "../utilities/calculateday";

const Welcome = ({ user, firebaseData, activeIndex }) => {
    console.log(firebaseData);

    return (
        <div>
            <div classNamme="WelcomeTitle" style={{ color: '#b43434', fontSize: 25 }}>
                <h2>Welcome back {user.email ? user.email : user.name},</h2>

            </div>

            <div className="WelcomeDetails" style={{ marginLeft: '7.5%', marginRight: '7.5%' }}>
                Today you are in <b>phase {activeIndex}</b> of your ACL recovery.

                {/* {Object.entries(firebaseData) // First: entry 'ACL'
                    .map(data => {
                        return (Object.entries(data[1]) // Second: entry phase
                            .filter(phase => phase[0] === "phase1")
                            .map(phase => Object.entries(phase[1]) // Third: entry msg
                                .filter(msg => msg[0] == date)
                                .map(msg => {
                                    console.log(msg[0])
                                    return (
                                        <span>
                                            {msg[1].message}
                                        </span>
                                    )
                                }
                                )
                            )
                        )
                    }
                    )
                } */}
            </div>

        </div>
    )
}

export default Welcome;