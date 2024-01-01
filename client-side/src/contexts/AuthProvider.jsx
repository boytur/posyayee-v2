/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import instance from "../services/axios";

//สร้าง context
const AuthContext = createContext();

//สร้าง Provider component
const AuthProvider = ({ children }) => {
  //กำหนด state สำหรับ storeName
  const [storeName, setStoreName] = useState(null);
  //ใช้ useEffect เพื่อตรวจสอบสถานะ Authentication
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await instance.get("/api/store/logedin");
        setStoreName(res.data.storeName);
        localStorage.setItem("isLoggedIn",true);
      } catch (error) {
        setStoreName(null);
        localStorage.setItem("isLoggedIn",false);

      }
    };
    checkAuthStatus();
  }, []);

  //กำหนดฟังก์ชัน loginStore และ logoutStore
  const loginStore = async (payload) => {
    try {
      const res = await instance.post("/api/store/login-store", payload);
      setStoreName(res.data.storeName);
      localStorage.setItem("isLoggedIn",true);
    } catch (error) {
      console.error("Login failed:", error);
      setStoreName(null);
      localStorage.setItem("isLoggedIn",false);
      throw error;
    }
  };

  const logoutStore = async () => {
    try {
      await instance.get("/api/store/logout");
      setStoreName(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  //ใช้ useMemo เพื่อปรับปรุงค่า context เฉพาะเมื่อ storeName เปลี่ยนแปลง
  const contextValue = useMemo(
    () => ({ storeName, loginStore, logoutStore}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storeName]
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