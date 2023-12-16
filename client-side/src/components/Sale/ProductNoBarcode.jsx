import data from "./products";
import { HiSortDescending } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

function ProductNoBarcode() {
  return (
    <div className="w-full h-full rounded-t-md">
      <div
        className="flex justify-center"
        style={{ height: "calc(100vh - 3.5rem)" }}
      >
        <div className="w-full">
          {/* Search box  */}
          <div className="w-full h-[3rem] flex relative items-center pb-1">
            <input
              placeholder="ค้นหาสินค้า...."
              className="w-full h-[3rem] border border-black/20 rounded-full pl-10 flex focus:outline-[#4C49ED]"
            ></input>
            <div className="w-[4rem] flex justify-center items-center absolute right-2">
              <HiSortDescending
                size={35}
                className=" hover:scale-105 cursor-pointer"
              />
            </div>
            <IoSearch size={20} className=" absolute left-3 text-[#737791]" />
          </div>
          <div
            style={{ height: "calc(100vh - 6.4rem)" }}
            className="overflow-y-scroll md:flex flex-wrap justify-center p-2"
          >
            {data.map((product) => (
              <div key={product.id} className="p-1">
                <div className="md:w-[140px] w-full border md:block items-center flex md:h-[185px] h-[60px] bg-white rounded-lg hover:border-2 hover:border-[#4C49ED] cursor-pointer">
                  <div className="p-1 w-[3.5rem] md:w-full">
                    <img
                      className="object-cover md:w-full md:h-[100px] h-[40px] w-[3rem] rounded-md"
                      src={product.productImagePath}
                      alt=""
                    />
                  </div>
                  <div className="md:pt-2 md:p-2 md:text-[.9rem] text-[1.2rem] md:pl-2 pl-4 w-3/4 md:w-full">
                    <p className=" truncate text-left">{product.productName}</p>
                  </div>
                  <div className="md:px-2 font-bold  w-1/4 md:w-full md:text-[1.3rem] text-[1rem]  text-[#4C49ED]">
                    <p>{product.productSalePrice} ฿</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductNoBarcode;
