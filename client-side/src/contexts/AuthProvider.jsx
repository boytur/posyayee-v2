/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState,useEffect } from "react";
import instance from "../services/axios";
import { getLocalStorage, setLocalStorage } from "../services/storage";
//สร้าง context
const AuthContext = createContext();

//สร้าง Provider component
const AuthProvider = ({ children }) => {
  //กำหนด state สำหรับ storeName
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);

  // //ใช้ useEffect เพื่อตรวจสอบสถานะ Authentication
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if(getLocalStorage("refreshToken")){
          const res = await instance.get("/api/v1/refresh");
          if(res.status===200){
            setLocalStorage("refreshToken", res.data.refreshToken);
          }
        }
      } catch (error) {
        return
      }
    };
    checkAuthStatus();
  }, []);

  //กำหนดฟังก์ชัน loginStore และ logoutStore
  const login = async (payload) => {
    try {
      const res = await instance.post("/api/v1/login", payload);
      setUser(res.data.user[0]);
      setStore(res.data.store[0]);
      setLocalStorage('refreshToken',res.data.refreshToken);
      window.location.reload();
    } catch (error) {
      return
    }
  };

  const logout = async () => {
    try {
      await instance.delete("/api/v1/logout");
      setUser();
      setStore();
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const contextValue = useMemo(
    () => ({ user,store, login, logout}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  //ให้ Provider component ทำหน้าที่ส่งค่า context ไปยัง child components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//สร้าง custom hook เพื่อให้ง่ายต่อการใช้ context ใน components อื่น ๆ
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

//ส่งออก AuthProvider เป็น default
export default AuthProvider;
