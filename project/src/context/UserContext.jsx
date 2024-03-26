import {useState, createContext, useEffect} from 'react';
import { toast } from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

    const getMe = async (accessToken) => {
        const response = await fetch("http://localhost:8000/api/me",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        const data = await response.json()
        setUser({
            id: data.id,
            nev: data.nev,
            email: data.email,
            telszam: data.telszam
        })
    }
    //felhasználó frissítése
    useEffect(()=>{
      // atmeneti megoldas
      const access_token = localStorage.getItem('userToken');
      getMe(access_token);
    },[token]);

    const login = async (logFormData) => {
        const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logFormData),
      });
      const data = await response.json();
      if(data.token) {
        setToken(data.token);
        localStorage.setItem('userToken', data.token);

        toast.success(data.message, {
          duration: 1000
        });
        return true;
    }
    toast.error(data.message);
    return false;
}
    
    const logout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
    }

    const register = async(regdata) => {
        const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regdata),
      });
      const data = await response.json();
      if(data.token){
        setToken(data.token)
        localStorage.setItem('userToken', data.token);
        toast.success(data.message, {
          duration: 1000
        });
        return true;
    }
    toast.error(data.message);
    return false;
}

    return <UserContext.Provider value = {
        {
            user,
            logout,
            login,
            register,
            token
        }
    }>{children}</UserContext.Provider>
}

export default UserContext;