import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { PiDatabase } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  const [navMobile, setNavMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // กำหนดปุ่มที่เป็น "active" ตามเส้นทางปัจจุบัน
  const getActiveButton = (route) => {
    return location.pathname === route ? "bg-[#E4E3FF] text-[#4C49ED]" : "";
  };

  // ฟังก์ชันสำหรับการนำทางไปยังเส้นทางอื่น ๆ
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full h-[3.2rem]">
      <div className="w-full flex">
        <div className=" w-full">
          <div className="md:hidden flex items-center h-[3.1rem]">
            <div className="pl-3">
              <FaBars
                onClick={() => setNavMobile(!navMobile)}
                className=" hover:scale-105"
                color="#4C49ED"
                size={30}
              />
              {/* Popover whe click fabar*/}
              {navMobile && (
                <div className="border absolute mt-3 w-[15rem] h-[18rem] bg-white shadow-xl rounded-md">
                  <div className="flex flex-col p-2 gap-1">
                    {/* Sale product */}
                    <button
                      className={`p-3 rounded-md ${getActiveButton(
                        "/"
                      )}`}
                      onClick={() => handleNavigate("/")}
                    >
                      <div className=" flex gap-2 justify-left">
                        <CiShop size={25} />
                        <p>ขายของหน้าร้าน</p>
                      </div>
                    </button>

                    {/* View stock */}
                    <button
                      className={`p-3 rounded-md ${getActiveButton(
                        "/view-stock"
                      )}`}
                      onClick={() => handleNavigate("/view-stock")}
                    >
                      <div className=" flex gap-2 justify-left">
                        <PiDatabase size={25} />
                        <p>ดูสต็อกสินค้า</p>
                      </div>
                    </button>

                    {/* Add product */}
                    <button
                      className={`p-3 rounded-md ${getActiveButton(
                        "/add-product"
                      )}`}
                      onClick={() => handleNavigate("/add-product")}
                    >
                      <div className="flex gap-2 justify-left">
                        <IoMdAddCircleOutline size={25} />
                        <p>เพิ่มสต็อกสินค้า</p>
                      </div>
                    </button>

                    {/* Analysis */}
                    <button
                      className={`p-3 rounded-md ${getActiveButton(
                        "/analysis"
                      )}`}
                      onClick={() => handleNavigate("/analysis")}
                    >
                      <div className=" flex gap-2 justify-left">
                        <IoAnalyticsSharp size={25} />
                        <p>วิเคราะห์ยอดขาย</p>
                      </div>
                    </button>

                    {/* History */}
                    <button
                      className={`p-3 rounded-md ${getActiveButton(
                        "/history"
                      )}`}
                      onClick={() => handleNavigate("/history")}
                    >
                      <div className=" flex gap-2 justify-left">
                        <MdOutlineHistoryToggleOff size={25} />
                        <p>ประวัติการขาย</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Profile and setting*/}
        <div className="w-full h-full flex justify-end gap-3 text-[#33363F]">
          <div className=" md:flex md:flex-col h-full md:pt-1 pt-3 hidden">
            <p className="md:text-[1rem] font-bold text-[10px]">
              สวัสดี, ร้านค้าแม่ยาหยี
            </p>
            <p className="md:text-[.7rem] text-[8px] flex justify-end">
              <span className=" font-bold">คนขาย: </span>แสงจันทร์
            </p>
          </div>
          <div className="pr-3 items-center flex h-[3.2rem] cursor-pointer">
            <img
              className="rounded-[100%] w-[2.5rem] h-[2.5rem] object-cover"
              src="https://s.isanook.com/ga/0/ud/222/1112961/popass(1).jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
