import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import Swal from "sweetalert2";

function NewStore() {
  const [payLoad, setPayLoad] = useState([
    "userStoreName",
    "userStoreImage",
    "userStoreRole",
    "userStorePassword",
  ]);

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

  const handleNextClick = (e) => {
    e.preventDefault();
    setPayLoad({ ...payLoad, userStoreImage: selectedFile });
    console.log(payLoad);
  };

  return (
    <div className=" flex justify-center flex-col">
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
            <div className="text-[2rem] font-bold mb-5 text-center">
              <h1>มาตั้งค่าคนขายกัน</h1>
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
                <input
                  className="h-[3rem] w-full pl-2 rounded-md text-[1.2rem] border focus:outline-[#4C49ED]"
                  placeholder="กรุณาตั้งรหัสผ่าน 6 หลัก"
                  type="password"
                  required
                  onChange={(e) =>
                    setPayLoad({
                      ...payLoad,
                      userStorePassword: e.target.value,
                    })
                  }
                />
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