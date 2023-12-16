import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { PiDatabase } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

function Aside() {
  const [aside, setAside] = useState(false);
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
    <div
      className={`w-[15rem] bg-white h-[100vh] px-1 hidden md:block ${
        aside ? "w-[3.7rem]" : ""
      }`}
    >
      <div className="flex justify-center">
        {/* Hambergerbar width logo desktop*/}
        <div className="flex items-center gap-1 w-full justify-center h-[3rem]">
          <div className="pt-[5px] cursor-pointer hover:scale-105">
            <FaBars
              color="#4C49ED"
              onClick={() => setAside(!aside)}
              size={26}
            />
          </div>
          <Link
            to="/sale-product"
            className={`text-[2rem] font-bold cursor-pointer ${
              aside ? "hidden" : ""
            }`}
          >
            <span className="text-[#4C49ED]">POS</span>YAYEE
          </Link>
        </div>
      </div>
      <div className="w-full justify-center flex flex-col pt-10 text-[#494a4d]">
        {/* Aside content */}
        {/* Sale */}
        <button
          className={`w-full h-[3rem] flex items-center gap-2 justify-left rounded-md cursor-pointer ${
            aside ? "justify-center" : "pl-7"
          } ${getActiveButton("/sale-product")}`}
          onClick={() => handleNavigate("/sale-product")}
        >
          <div>
            <CiShop size={20} />
          </div>
          <div className={`text-sm items-center flex ${aside ? "hidden" : ""}`}>
            <p>ขายของหน้าร้าน</p>
          </div>
        </button>

        {/* view stock */}
        <button
          className={`w-full h-[3rem] flex items-center gap-2 justify-left  rounded-md cursor-pointer ${
            aside ? "justify-center" : "pl-7"
          } ${getActiveButton("/view-stock")}`}
          onClick={() => handleNavigate("/view-stock")}
        >
          <div>
            <PiDatabase size={20} />
          </div>
          <div className={`text-sm items-center flex ${aside ? "hidden" : ""}`}>
            <p>ดูสต็อกสินค้า</p>
          </div>
        </button>

        {/* add product */}
        <button
          className={`w-full h-[3rem] flex items-center gap-2 justify-left rounded-md cursor-pointer ${
            aside ? "justify-center" : "pl-7"
          } ${getActiveButton("/add-product")}`}
          onClick={() => handleNavigate("/add-product")}
        >
          <div>
            <IoMdAddCircleOutline size={20} />
          </div>
          <div className={`text-sm items-center flex ${aside ? "hidden" : ""}`}>
            <p>เพิ่มสต็อกสินค้า</p>
          </div>
        </button>

        {/* analysis */}
        <button
          className={`w-full h-[3rem] flex items-center gap-2 justify-left rounded-md cursor-pointer ${
            aside ? "justify-center" : "pl-7"
          } ${getActiveButton("/analysis")}`}
          onClick={() => handleNavigate("/analysis")}
        >
          <div>
            <IoAnalyticsSharp size={20} />
          </div>
          <div className={`text-sm items-center flex ${aside ? "hidden" : ""}`}>
            <p>วิเคราะห์ยอดขาย</p>
          </div>
        </button>

        {/* history */}
        <button
          className={`w-full h-[3rem] flex items-center gap-2 justify-left rounded-md cursor-pointer ${
            aside ? "justify-center" : "pl-7"
          } ${getActiveButton("/history")}`}
          onClick={() => handleNavigate("/history")}
        >
          <div>
            <MdOutlineHistoryToggleOff size={20} />
          </div>
          <div className={`text-sm items-center flex ${aside ? "hidden" : ""}`}>
            <p>ประวัติการขาย</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Aside;
