const calculateDay = (startdate) => {

    let milisec_in_days = 86400000;
    //set the startdate as the beginning of the day 0:00
    startdate = Math.floor(startdate / milisec_in_days) * milisec_in_days
    let days = (Date.now() - startdate) / milisec_in_days
    return Math.floor(days) + 1
}
export default calculateDay