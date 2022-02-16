import calculateDay from "../utilities/calculateday";

const Welcome = ({ user, firebaseData, activeIndex }) => {
    //has to change userid as its real id later
    let userid = 0
    let startdate = firebaseData["user"][userid]["startDate"]
    let days = calculateDay(startdate)

    return (
        <div>
            <div classNamme="WelcomeTitle" style={{ color: '#b43434', fontSize: 25 }}>
                <h2>Welcome back {user.email ? user.email : user.name},</h2>

            </div>

            <div className="WelcomeDetails" style={{ marginLeft: '7.5%', marginRight: '7.5%' }}>
                Today you are in <b>phase {activeIndex}</b> of your ACL recovery.
                <br />
                {
                    Object.entries(firebaseData["surgery"]["acl"]["days"])
                        .filter(data => data[0] == days).map(msg => {
                            return (
                                <span>
                                    {msg[1].message}
                                </span>
                            )
                        })
                }
            </div>

        </div>
    )
}

export default Welcome;