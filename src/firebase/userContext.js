import React,{useState,useEffect} from 'react'
import firebase from 'firebase'
import { app } from './firebaseConfig'

export const UserContext = React.createContext();

export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        app.auth().onAuthStateChanged((user)=>{
                setCurrentUser(user)
        })
    }, [])

    return <UserContext.Provider value = {currentUser}>{children}</UserContext.Provider>
}

