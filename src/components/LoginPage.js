import { SignInOut } from "./SignInWithGoogle"
import React, { useState } from 'react';
const LoginPage = () => {
    const [userEmail, setUserEmail] = useState()
    return (
        <div>
            <SignInOut setUserEmail={setUserEmail} />
        </div>
    )
}

export default LoginPage