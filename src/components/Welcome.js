import React, { useState, useEffect } from 'react';

const Welcome = ({user, firebaseData, activeIndex}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const initUser = (user) => {
        setName(user.name);
        setType(user.surgeryType);
    }

    const defaultUser = () => {
        setName("Edward");
        setType("acl");
    }

    useEffect(() => {
        Object.entries(firebaseData.user).map((entry) => {
            entry[1].email === user.email ? initUser(entry[1]) : defaultUser();
        })
    })

    const date = 2; // need to change depends on the start day
    return (
        <div>
            <div style={{color: '#b43434', fontSize: 25}}>
                <h2> Welcome back {name ? name : "Nobody"}, </h2>
            </div>

            <div style={{marginLeft: '7.5%', marginRight: '7.5%'}}>
                Today you are in <b>phase {activeIndex}</b> of your ACL recovery.

                { Object.entries(firebaseData.surgery) // First: entry 'ACL'
                    .filter(data => data[0] === type)
                    .map(data => { return(Object.entries(data[1].days) // Second: entry phase
                                .filter(days => days[0] == date)
                                .map(msg => {
                                    return (
                                        <span>{msg[1].message}</span>
                                    )
                                })
                        )}
                    )
                }
            </div>

        </div>
    )
}

export default Welcome;