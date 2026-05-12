import { useContext } from 'react';
import { AuthContext } from '../auth.context.jsx';
import {login, register, logout, getMe} from '../services/auth.api.js';

export const useAuth = () => {
    const context = useContext(AuthContext) // useContext is a React hook that allows you to access the context value from the nearest matching Provider above in the component tree. In this case, it allows you to access the authentication state and functions provided by the AuthProvider component.
    const {user, setUser, loading, setLoading} = context 

    // This function will handle the login process. It will call the login function from the auth.api.js file, which makes an API request to the backend to authenticate the user. If the login is successful, it will set the user state with the returned user data and update the loading state accordingly.
    const handleLogin = async ({email, password}) => {
        setLoading(true)
        const data = await login({email, password})
        setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async ({username, email, password}) => {
        setLoading(true)
        const data = await register({username, email, password})
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return {user, loading, handleLogin, handleRegister, handleLogout}
}