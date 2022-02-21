import { SignInOut } from "./SignInWithGoogle"
import React, { useState } from 'react';
const LoginPage = ({isMobile}) => {
    /*To do 
        1. get user data from firebase, then find if there is data[user][userEmail]
        2. if not then go to register page
        3. if yes then setUser and show userpage
       */
    return (
        <div>
            <SignInOut isMobile={isMobile}/>
        </div>
    )
}

export default LoginPage