const calculateDay = ({ startdate }) => {
    startdate = 1644978994449
    let milisec_in_days = 86400000;
    let days = (Date.now() - startdate) / milisec_in_days
    return Math.floor(days)
}
export default calculateDay