import { setData } from '../utilities/firebase';
import calculateDay from './calculateday';

const calculateFirstLogin = (currentDay, user, googleUser, startDate ) => {
    
    console.log(user);
    // if(!user.lastLoginDay){
    //     return true;
    // }else{
    //     if(Number(user.lastLoginDay) === currentDay){
    //         return false;
    //     }else{    
    //         return true;
    //     }
    // } 
    
};

export default calculateFirstLogin;