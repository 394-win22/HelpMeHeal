const calculateDay = (startdate) => {
    //now use central
    let timeDifToUTC = 6
    let milisec_in_hours = 3600000
    let milisec_in_days = 86400000;
    startdate = startdate - (timeDifToUTC * milisec_in_hours)
    //set the startdate as the beginning of the day 0:00
    let dateNow = Date.now() - (timeDifToUTC * milisec_in_hours)
    startdate = Math.floor(startdate / milisec_in_days) * milisec_in_days
    let days = (dateNow - startdate) / milisec_in_days
    return Math.floor(days) +1
}
export default calculateDay