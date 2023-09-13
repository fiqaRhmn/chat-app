import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {auth} from "../firebase"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentuser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user) =>{
            setCurrentuser(user);
            console.log(user);
        });

        return () => {
            unsub();
        };
    },[]);

    return(
        <AuthContext.Provider value={{currentUser}}>
        {children}
        </AuthContext.Provider>
    );

}