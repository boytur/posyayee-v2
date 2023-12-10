import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import {
  IoPricetagOutline,
  IoHomeOutline,
  IoDocumentsOutline,
} from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";

function Navbar() {
  const [navShow, setNavShow] = useState(false);
  const [scroll, setScroll] = useState(false);

  const toggleNav = () => {
    setNavShow(!navShow);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScroll(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getActiveButton = (route) => {
    return location.pathname === route ? "text-[#4C49ED]" : "";
  };
  return (
    <div className="w-full h-14 flex justify-center">
      <div
        className={`w-full justify-center flex bg-white h-16 fixed ${
          scroll ? "shadow-lg" : " "
        }`}
      >
        <nav className="h-14 w-full max-w-screen-xl lg:flex lg:flex-row items-center flex flex-col pt-2">
          <div className="w-full lg:w-[20rem]">
            <div className="flex justify-start w-full items-center pl-4">
              <span>
                <RiMenuLine
                  size={35}
                  color="#4C49ED"
                  className="cursor-pointer pt-1 lg:hidden"
                  onClick={() => toggleNav()}
                />
              </span>
              <Link to="/" className=" cursor-pointer">
                <span className="text-[2.2rem] font-bold text-[#4C49ED]">
                  POS
                </span>
                <span className="text-[2.2rem] font-bold">YAYEE</span>
              </Link>
            </div>
          </div>
          <div
            className={`lg:flex  w-full justify-start bg-white lg:justify-end ${
              navShow ? "flex" : "hidden"
            }`}
          >
            <ul className="lg:flex lg:flex-row justify-between gap-1 flex flex-col  w-full lg:pt-1">
              <Link to="/" className={`cursor-pointer ${getActiveButton("/")}`}>
                <div className="flex items-center gap-2 lg:text-[.8rem] pl-6 lg:pl-0 h-14">
                  <IoHomeOutline />
                  <p>หน้าหลัก</p>
                </div>
              </Link>
              <Link
                to="/price"
                className={`cursor-pointer ${getActiveButton("/price")}`}
              >
                <div className="flex items-center gap-2 lg:text-[.8rem] pl-6 lg:pl-0 h-14">
                  <IoPricetagOutline className="" />
                  <p>ราคา</p>
                </div>
              </Link>
              <Link
                to="/documentation"
                className={`cursor-pointer ${getActiveButton(
                  "/documentation"
                )}`}
              >
                <div className="flex items-center gap-2 lg:text-[.8rem] pl-6 h-14">
                  <IoDocumentsOutline />
                  <p>คู่มือการใช้งาน</p>
                </div>
              </Link>
              <Link
                to="/reviews"
                className={`cursor-pointer ${getActiveButton("/reviews")}`}
              >
                <div className="flex items-center gap-2 lg:text-[.8rem] pl-6 h-14">
                  <MdOutlineRateReview className="pt-[2px]" />
                  <p>แจ้งปัญหา/รีวิว</p>
                </div>
              </Link>
              <Link
                to="/contact"
                className={`cursor-pointer ${getActiveButton("/contact")}`}
              >
                <div className="flex items-center gap-2 lg:text-[.8rem] pl-6 h-14">
                  <IoMdContacts />
                  <p>ติดต่อเรา</p>
                </div>
              </Link>
              <li className="lg:flex">
                <li className="pb-5 lg:pb-0">
                  <div className="flex items-center gap-4 lg:text-[.8rem] px-2 h-9 lg:h-14">
                    <button className="lg:w-[125px] w-full h-[50px] lg:h-[46px] rounded-[6px] bg-[#DBDBDB] text-black hover:bg-[#b6b6b6]">
                      <p>สมัครเป็นร้านค้า</p>
                    </button>
                  </div>
                </li>
                <li className="pb-[29rem] lg:pb-0">
                  <div className="flex items-center gap-4 lg:text-[.8rem] px-2 h-9 lg:h-14">
                    <a
                      className="lg:w-[125px] w-full h-[50px] lg:h-[46px] rounded-[6px] bg-[#4C49ED] text-white hover:bg-[#4c49edc0]"
                      href="https://sale.posyayee.shop"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="lg:w-[125px] w-full h-[50px] lg:h-[46px] rounded-[6px] bg-[#4C49ED] text-white hover:bg-[#4c49edc0]">
                        <p>เข้าสู่ระบบร้านค้า</p>
                      </button>
                    </a>
                  </div>
                </li>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;