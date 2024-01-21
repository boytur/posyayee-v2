import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { PiDatabase } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "../../services/jwtDecode";

const menuData = [
  {
    title: "ขายของหน้าร้าน",
    path: "/sale-product",
    icon: <CiShop size={20} />,
  },
  {
    title: "ดูสต็อกสินค้า",
    path: "/view-stock",
    icon: <PiDatabase size={20} />,
  },
  {
    title: "เพิ่มสต็อกสินค้า",
    path: "/add-product",
    icon: <IoMdAddCircleOutline size={20} />,
  },
  {
    title: "วิเคราะห์ยอดขาย",
    path: "/analysis",
    icon: <IoAnalyticsSharp size={20} />,
  },
  {
    title: "ประวัติการขาย",
    path: "/history",
    icon: <MdOutlineHistoryToggleOff size={20} />,
  },
];

function Aside() {
  const [aside, setAside] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveButton = (route) => {
    return location.pathname === route ? "bg-[#E4E3FF] text-[#4C49ED]" : "";
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const user = jwtDecode(localStorage.getItem("refreshToken"));
  const isOwner = user?.user[0]?.user_role === "owner";

  return (
    <div
      className={`w-[15rem] bg-white h-[100vh] px-1 hidden md:block ${
        aside ? "w-[3.7rem]" : ""
      }`}
    >
      <div className="flex justify-center">
        <div className="flex items-center gap-1 w-full justify-center h-[3rem]">
          <div className="cursor-pointer hover:scale-105 flex items-center">
            <FaBars
              className="mt-1"
              color="#4C49ED"
              onClick={() => setAside(!aside)}
              size={26}
            />
          </div>
          <Link
            to="/"
            className={`text-[2rem] font-bold cursor-pointer ${
              aside ? "hidden" : ""
            }`}
          >
            <span className="text-[#4C49ED]">POS</span>YAYEE
          </Link>
        </div>
      </div>
      <div className="w-full justify-center flex flex-col pt-10 text-[#494a4d]">
        {menuData.map(
          (item) =>
            (isOwner ||
              item.path === "/sale-product" ||
              item.path === "/view-stock" ||
              item.path === "/add-product") && (
              <button
                key={item.path}
                className={`w-full h-[3rem] flex items-center gap-2 justify-left rounded-md cursor-pointer ${
                  aside ? "justify-center" : "pl-7"
                } ${getActiveButton(item.path)}`}
                onClick={() => handleNavigate(item.path)}
              >
                <div>{item.icon}</div>
                <div
                  className={`text-sm items-center flex ${
                    aside ? "hidden" : ""
                  }`}
                >
                  <p>{item.title}</p>
                </div>
              </button>
            )
        )}
      </div>
    </div>
  );
}
export default Aside;
