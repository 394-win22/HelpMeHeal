import React, { useState, useEffect } from 'react';
import calculateDay from '../utilities/calculateday';

const Welcome = ({ username, surgeryType, firebaseData, activeIndex, currentDay, daysDict }) => {
    

    let daysHasMessage

    for (const [key,] of Object.entries(daysDict)) {
        if (currentDay >= key) {
            daysHasMessage = key
        }
    }

    return (
        <div>
            <div style={{ color: '#b43434', fontSize: 25 }}>
                <h2> Welcome back {username ? username : "Nobody"}, </h2>
            </div>

            <div style={{ marginLeft: '7.5%', marginRight: '7.5%' }}>
                Today you are in <b>phase {activeIndex}</b> of your ACL recovery.
                <br />
                {Object.entries(firebaseData.surgery) // First: entry 'ACL'
                    .filter(data => data[0] === surgeryType)
                    .map(data => {
                        return (Object.entries(data[1].days) // Second: entry phase
                            .filter(days => days[0] == daysHasMessage)
                            .map(msg => {
                                return (
                                    <span>{msg[1].message}</span>
                                )
                            })
                        )
                    }

                    )
                }
            </div>
        </div >
    )
}

export default Welcome;