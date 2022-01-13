import React,{useState,useEffect} from 'react'


export const SearchContext = React.createContext();

export const SearchProvider = ({children})=>{
    const [searchTerm, setSearchTerm] = useState("")

    const update=(text)=>
    {
        setSearchTerm(text)
    }
    // useEffect(() => {
    //     app.auth().onAuthStateChanged((user)=>{
    //             setCurrentUser(user)
    //     })
    // }, [])

return <SearchContext.Provider value = {{searchTerm,setSearchTerm, update}}>{children}</SearchContext.Provider>
}

