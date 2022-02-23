import React, { useEffect, useState } from 'react';
import useStore from '../Store';
import { useData } from '../utilities/firebase';
import { Loading } from "../components/Loading";
import { Error404 } from "../components/404";
import DoctorHomePage from './DoctorHomePage';
import PatientDetail from './PatientDetail';

const Doctor = ({ name, googleUser }) => {
    const [data, loadingData, errorData] = useData("/");
    const page = useStore(state => state.DoctorPage);
    const [patientInfo, setpatientInfo] = useState("");
    // firebase data initialize
    useEffect(() => {
        if (data === undefined) return;

    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    function getPage() {
        switch (page) {
            case "DoctorHome":
                return <DoctorHomePage username={name} data={data} googleUser={googleUser} setpatientInfo={setpatientInfo} />;
            case "PatientDetail":
                return <PatientDetail patientInfo={patientInfo} />;

            default:
                return <p>Sorry, there's been an error.</p>
        }
    }
    return (
        <div>
            {getPage()}
        </div>
    );
}
export default Doctor