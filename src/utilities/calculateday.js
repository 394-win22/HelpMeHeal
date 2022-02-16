const calculateDay = (startdate) => {

    let milisec_in_days = 86400000;
    let days = (Date.now() - startdate) / milisec_in_days
    return Math.floor(days) + 1
}
export default calculateDay