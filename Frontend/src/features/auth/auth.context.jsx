// createContext is used to create a context object that can be used to share data across components without having to pass props down manually at every level.

import { createContext, useState } from "react"; 

export const AuthContext = createContext()

// This component will wrap your whole app. It will provide the authentication state to all components that need it. 
export const AuthProvider = ({ children }) => {
         const [user, setUser] = useState(null)
         const [loading, setLoading] = useState(false)

         return (
            <AuthContext.Provider value = {{user, setUser, loading, setLoading}}>
                {children}
            </AuthContext.Provider>
         )
}
 