import { SignInOut } from "./SignInWithGoogle"
import React, { useState } from 'react';
const LoginPage = ({ isMobile }) => {
    /*To do 
        1. style it!
       */
    return (
        <div>
            <SignInOut isMobile={isMobile} />
        </div>
    )
}

export default LoginPage