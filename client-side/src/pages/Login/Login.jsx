/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Login.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/Authorize";

const isLogedIn = sessionStorage.getItem("isLogedIn");

function Login() {
  document.title = "POSYAYEE 🔐 Login";
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();
  // Payload
  const [payLoad, setPayLoad] = useState({
    storeOwnEmail: "",
    storeOwnPassword: "",
  });

  // Submit req login
  const API = import.meta.env.VITE_API_KEY;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate data
    if (!payLoad.storeOwnEmail.trim() || !payLoad.storeOwnPassword.trim()) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบถ้วนค่ะ!",
        text: "อีเมลหรือรหัสผ่านยังไม่ได้กรอกค่ะ",
        icon: "question",
      });
    } else {
      // Send req to server
      try {
        await axios
          .post(`${API}/api/store/login-store`, payLoad)
          .then((res) => {
            // Login success
            auth(res.data, () => {
              if (res.data.data[0].newStore) {
                navigate("/new-store");
                window.location.reload(false);
              } else {
                navigate("/choose-seller");
                window.location.reload(false);
              }
            });
          });
        // Login fail
      } catch (err) {
        Swal.fire({
          title: err.response.data.msg,
          icon: "error",
          timer: 5000,
        });
      }
    }
  };

  return (
    <div className={`login-background ${isLogedIn !== null ? "hidden": ""}`}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="md:w-[370px] md:h-[500px] w-full h-full bg-white md:rounded-md flex-col z-50"
      >
        <div className="flex items-center gap-1 justify-center md:mt-7 mt-24">
          <h1 className="font-bold text-[2.7rem] pt-[3.3px]">
            <span className="text-[#4C49ED]">POS</span>YAYEE
          </h1>
        </div>
        <div className="text-xl text-center mt-7">
          <p>เข้าสู่ระบบร้านค้า</p>
        </div>
        <div className="w-full md:px-6 px-3 md:mb-0">
          <p
            className="block tracking-wide text-gray-600 text-sm mb-2 text-left pl-1"
            htmlFor="username"
          >
            อีเมล
          </p>
          <input
            className="appearance-none block w-full
          text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] bg-white"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={(e) =>
              setPayLoad({ ...payLoad, storeOwnEmail: e.target.value })
            }
          />
        </div>
        <div className="w-full md:px-6 px-3">
          <p
            className="block tracking-wide text-gray-600 text-sm mb-2 text-left pl-1"
            htmlFor="password"
          >
            รหัสผ่าน
          </p>
          <div className="relative">
            <input
              className="appearance-none block w-full text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] bg-white text"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
              required
              onChange={(e) =>
                setPayLoad({ ...payLoad, storeOwnPassword: e.target.value })
              }
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </div>
        <div className="w-full md:px-6 px-3 mb-6 mt-[40px]">
          <button
            className="appearance-none block h-[52px] w-full bg-[#4C49ED] cursor-pointer text-white border rounded py-3 px-2 mb-3 leading-tight hover.bg-[#4c49edd6] hover.border-2 hover.border-[#4c49ed81]"
            type="submit"
          >
            เข้าสู่ระบบ
          </button>
          <div className="flex mt-5 ml-[1px] text-right justify-end">
            <div className=" underline text-[#4C49ED] text-sm">
              <a href="" className=" cursor-pointer">
                สมัครเป็นร้านค้า
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
