import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

function NewStore() {
  //check if user is already owner
  const navigate = useNavigate();
  const [newStore, setNewStore] = useState(true);

  useEffect(() => {
    const userAready = sessionStorage.getItem("userStore");
    if (userAready !== "[]") {
      setNewStore(false);
      navigate("/choose-seller");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [payLoad, setPayLoad] = useState({
    userStoreName: "",
    userStoreImagePath: null,
    userStoreRole: "",
    userStorePassword: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1024 * 1024) {
        setSelectedFile(file);
      } else {
        Swal.fire({
          title: "กรุณาเลือกภาพอื่น",
          text: "ไฟล์ภาพต้องมีขนาดไม่เกิน 1 เม็กกะไบต์ค่ะ",
          icon: "error",
        });
      }
    }
  };

  //Handle submit
  const API = import.meta.env.VITE_API_KEY;
  const handleNextClick = async (e) => {
    console.log(selectedFile);
    e.preventDefault();
    setPayLoad({ ...payLoad, userStoreImagePath: selectedFile });

    try {
      //เพราะว่ามีไฟล์เลยต้องใช้ formData
      const formData = new FormData();
      formData.append("userStoreName", payLoad.userStoreName);
      formData.append("userStoreRole", payLoad.userStoreRole);
      formData.append("userStorePassword", payLoad.userStorePassword);
      formData.append("photo", selectedFile);

      await axios
        .post(`${API}/api/store/signup-employee`, formData, config)
        .then((res) => {
          navigate("/");
          return res;
        });
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className={`justify-center flex-col ${!newStore ? "hidden" : "flex"}`}>
      <nav className="flex h-[4rem] w-full justify-between items-center md:px-10 px-2">
        <div className=" cursor-pointer">
          <span className="text-[2.2rem] font-bold text-[#4C49ED]">POS</span>
          <span className="text-[2.2rem] font-bold">YAYEE</span>
        </div>
        <div className="rounded-[6px] hover:scale-105 underline">
          <a
            className="lg:w-[125px] w-full h-[50px] lg:h-[46px]"
            href="https://sale.posyayee.shop"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </nav>
      <div className=" w-full flex justify-center">
        <div
          style={{ height: "calc(100vh - 5.2rem" }}
          className="w-full h-screen max-w-[30rem] flex flex-col items-center justify-center px-2"
        >
          <form
            onSubmit={(e) => handleNextClick(e)}
            className="w-full mx-auto bg-white p-8 border rounded-md shadow-md"
          >
            <div className="flex items-center justify-center mb-5">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Image"
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : (
                <IoPersonAddOutline size={100} color="#4C49ED" />
              )}
            </div>
            <div className="mb-5 text-center">
              <h1 className="text-[2rem] font-bold">มาตั้งค่าคนขายกัน</h1>
              <p className=" text-sm">
                คนขายคนแรกจะมีสิทธิ์เป็นเจ้าของร้านโดยอัตโนมัติ
              </p>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="dropzone-file"
                className={`${
                  selectedFile
                    ? "hidden"
                    : "flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      คลิกเพื่ออัพโหลดรูปภาพ
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ขนาดภาพสูงสุดไม่เกิน 1 เม็กกะไบต์
                  </p>
                </div>
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex gap-5 flex-col md:flex md:flex-row ">
              <div className=" w-full flex flex-col gap-5">
                <input
                  className="h-[3rem] w-full pl-2 rounded-md text-[1.2rem] border focus:outline-[#4C49ED]"
                  placeholder="กรุณาป้อนชื่อเจ้าของร้าน"
                  type="text"
                  required
                  onChange={(e) =>
                    setPayLoad({ ...payLoad, userStoreName: e.target.value })
                  }
                />
                <div className=" relative">
                  <input
                    className="h-[3rem] w-full pl-2 rounded-md text-[1.2rem] border focus:outline-[#4C49ED]"
                    placeholder="กรุณาตั้งรหัสผ่าน 6 หลัก"
                    type={showPassword ? "number" : "password"}
                    required
                    onChange={(e) =>
                      setPayLoad({
                        ...payLoad,
                        userStorePassword: e.target.value,
                      })
                    }
                  />
                  <span
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="w-full h-[3.5rem] text-white flex justify-center items-center gap-1 bg-[#4C49ED] rounded-md hover:bg-[#4c49ede2]"
                    onClick={(e) => handleNextClick(e)}
                  >
                    <p>ถัดไป</p>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewStore;