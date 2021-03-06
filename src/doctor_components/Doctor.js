import React, { useEffect, useState } from 'react';
import useStore from '../Store';
import { useData } from '../utilities/firebase';
import { Loading } from "../utilities/Loading";
import { Error404 } from "../utilities/404";
import DoctorHomePage from './DoctorHomePage';
import PatientDetail from './PatientDetail';
import DoctorNavBar from './DoctorNav';

const Doctor = ({ name, googleUser, user, isMobile }) => {
    const [data, loadingData, errorData] = useData("/");
    const setPage = useStore(state => state.setDoctorPage);
    const page = useStore(state => state.DoctorPage);
    const [patientInfo, setpatientInfo] = useState("");

    // firebase data initialize
    useEffect(() => {
        if (data === undefined) return;

    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading isMobile={isMobile}/>;

    function getPage() {
        switch (page) {
            case "DoctorHome":
                return <DoctorHomePage username={name} data={data} googleUser={googleUser} setpatientInfo={setpatientInfo} isMobile={isMobile} />;
            case "PatientDetail":
                return <PatientDetail patientInfo={patientInfo} isMobile={isMobile} />;

            default:
                return <p>Sorry, there's been an error.</p>
        }
    }

    return (
        <div>
            <div>
                {getPage()}
            </div>
            <DoctorNavBar
                setPage={setPage}
                user={user}
                isMobile={isMobile}
            />
        </div>
    );
}
export default Doctor