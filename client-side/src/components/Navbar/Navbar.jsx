/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { PiDatabase } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { jwtDecode } from "../../services/jwtDecode";
import { getLocalStorage } from "../../services/storage";
import { useAuth } from "../../contexts/AuthProvider";

function Navbar({ dummyProducts }) {
  //dummyProducts in cart
  let productsInCart = 0;
  if (!dummyProducts) {
    productsInCart = 0;
  } else {
    productsInCart = dummyProducts.length + 1;
  }

  const [navMobile, setNavMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {logout} = useAuth();

  // กำหนดปุ่มที่เป็น "active" ตามเส้นทางปัจจุบัน
  const getActiveButton = (route) => {
    return location.pathname === route ? "bg-[#E4E3FF] text-[#4C49ED]" : "";
  };

  // ฟังก์ชันสำหรับการนำทางไปยังเส้นทางอื่น ๆ
  const handleNavigate = (route) => {
    navigate(route);
  };

  const user = jwtDecode(getLocalStorage("refreshToken"));

  return (
    <div className="w-full h-[3.2rem]">
      <div className="w-full flex">
        <div className=" w-full">
          <div className="md:hidden flex items-center h-[3.1rem]">
            <div className="pl-3">
              <FaBars
                onClick={() => setNavMobile(!navMobile)}
                className=" hover:scale-105 cursor-pointer"
                color="#4C49ED"
                size={30}
              />
              {/* Popover whe click fabar*/}
              {navMobile && (
                <div className="border absolute mt-3 w-[95%] h-[26rem] bg-white shadow-xl rounded-md z-50">
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
                    {/* Img profile for mobile */}
                    <br />
                    <hr />
                    <button className="p-3 rounded-md items-center flex gap-1">
                      <div>
                        <div className=" flex gap-2 justify-left font-bold">
                          <img
                            className="rounded-[100%] w-[2rem] h-[2rem] object-cover"
                            src={user.user[0].user_image}
                            alt=""
                          />
                          <p>{user.store[0].store_name || ""}</p>
                        </div>
                        <div className="w-full justify-end flex">
                          {user.user[0].user_fname +
                            " " +
                            user.user[0].user_lname || ""}
                        </div>
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
              {user.store[0].store_name || ""}
            </p>
            <p className="md:text-[.7rem] text-[8px] flex justify-end">
              <span className=" font-bold">คนขาย: </span>
              {user.user[0].user_fname + " " + user.user[0].user_lname || ""}
            </p>
          </div>
          <div className="pr-3 items-center md:flex h-[3.2rem] cursor-pointer hidden">
            <img
              className="rounded-[100%] w-[2.5rem] h-[2.5rem] object-cover"
              src={user.user[0].user_image}
              alt=""
              onClick={()=> logout()}
            />
          </div>
          {/*Total product in cart */}
          <div className="pr-4 items-center flex h-[3.2rem] md:hidden relative">
            <BsCart
              size={29}
              className="cursor-pointer hover:scale-105 text-[#4C49ED]"
            />
            <p className="text-sm border rounded-full w-6 h-6 text-center absolute top-1 left-[15px] bg-[#fe0000] text-white">
              {productsInCart}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;