 import React, { createContext, useState, useEffect } from "react";
 import axiosInstance from "../Utils/axiosInstance";
 import { API_PATHS } from "../Utils/apiPaths";

 export const UserContext = createContext();

 const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); //New state to track loading

    useEffect(() => {
        if(user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken) {
            setLoading (false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                            setLoading (false);

            }
        };

        fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

/*

useEffect(() => {
  const fakeUser = {
    name: "Shiwangi Ojha",
    email: "shiwangi@example.com",
    token: "dummy-token-123"
  };

  setUser(fakeUser);
  localStorage.setItem("token", fakeUser.token);
  setLoading(false);
}, []);

*/


    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);//Save token
                    setLoading (false);

    };

     const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
                  

    };


    return (
        <UserContext.Provider value = {{ user, loading, updateUser, clearUser }}>
            { children }
        </UserContext.Provider>
    )
 }

 export default UserProvider;