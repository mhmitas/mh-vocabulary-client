import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../hooks/useAxios";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    function logOutUser() {
        try {
            axiosInstance.post("/logout")
            setUser(null)
            setAuthLoading(false)
        } catch (err) {
            console.error("log out error:", err);
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        axiosInstance.get("/current-user", { headers: { Authorization: "Bearer myToken" } })
            .then((res) => {
                console.log("current user...", res.data);
                setUser(res.data)
                setAuthLoading(false)
            }).catch(err => {
                console.error(err);
                setAuthLoading(false)
            })
    }, [])

    const authInfo = {
        user,
        setUser,
        authLoading,
        setAuthLoading,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;