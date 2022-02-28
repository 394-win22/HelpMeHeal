const calculatePhase = (currentDay, phaseEndDay) => {
    let phase;

    for (const [key, value] of Object.entries(phaseEndDay)) {
        if (currentDay <= value) {
            phase = key;
            break;
        }
        else {
            phase = Object.entries(phaseEndDay).length;
        }
    }
    return phase;
}

export default calculatePhase;