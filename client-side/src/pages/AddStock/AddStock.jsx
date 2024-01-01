import Aside from "../../components/Aside/Aside"
import Navbar from "../../components/Navbar/Navbar"

function AddStock() {
  document.title = "POSYAYEE 📦 เพิ่มสต็อกสินค้า"
  return (
    <div className=" w-full h-[100vh]">
    <div className="w-full absolute">
      <Navbar />
    </div>
    <div className="flex">
      <div className="z-30">
        <Aside />
      </div>
      {/* Content here  */}
      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="w-full bg-[#F9FAFB] h-[100vh] mt-[3rem]"
      >
        <div className="border w-full h-full">
          Add stock
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddStock