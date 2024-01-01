import logo from "../../assets/Logo.png";
import "./RefreshLoading.css";

function RefreshLoading() {
  return (
    <div className="absolute w-full h-full flex items-center justify-center z-50">
      <div className="text-bolder flex justify-center flex-col items-center">
        <div className=" w-[6rem]">
          <img className=" w-full" src={logo} alt="" />
        </div>
        <div className="relative pt-5 pr-2">
          <span className="refreshLoading absolute"></span>
        </div>
      </div>
    </div>
  );
}

export default RefreshLoading;
