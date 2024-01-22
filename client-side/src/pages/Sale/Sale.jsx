import Aside from "../../components/Aside/Aside";
import Navbar from "../../components/Navbar/Navbar";
import ProductNoBarcode from "./ProductNoBarcode";
import Scan from "./Scan";
import dummyProducts from "./products";

function Sale() {
  document.title = "POSYAYEE 💸 ขายของหน้าร้าน"
  return (
    <div className=" w-full h-[100vh]">
      <div className="w-full absolute">
        <Navbar dummyProducts = {dummyProducts}/>
      </div>
      <div className="flex">
        <div className="z-30">
          <Aside />
        </div>
        {/* Content here  */}
        <div
          style={{ height: "calc(100vh - 3rem)" }}
          className="w-full bg-[#F9FAFB] h-[100vh] mt-[3rem] flex"
        >
          <div className="w-full h-full p-1 pb-0">
            <ProductNoBarcode/>
          </div>
          <div className="w-[80%] h-full p-1 pb-0 md:block hidden">
            <Scan/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
