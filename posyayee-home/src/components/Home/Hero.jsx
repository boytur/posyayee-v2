function Hero() {
  return (
    <div className="w-full flex justify-center">
    <div className="w-full h-[35rem] lg:flex  mt-6 max-w-screen-xl">
      <div className="lg:h-full h-[40%] md:h-[80%] md:mt-8 w-full flex lg:p-7 order-1 justify-center">
        <img
          className=" object-contain"
          autoPlay
          src="https://img.freepik.com/free-vector/video-media-player-design_114579-839.jpg"
        />
      </div>
      <div className="h-full w-full lg:mt-16 md:mt-8">
        <div className="lg:text-[4rem] text-[2.6rem] text-center lg:text-left font-semibold  lg:mt-9 md:text-[4rem]">
          <h1>
            “ใช้งานง่าย <br />
            &nbsp; ราคาสบายกระเป๋า”
          </h1>
        </div>
        <div className="h-full w-full  lg:pl-4">
          <div className="lg:pl-5 px-3 text-center lg:text-left">
            <span className="text-[#4C49ED] font-bold md:text-[1.5rem]">
              POS
            </span>
            <span className="font-bold md:text-[1.5rem]">YAYEE </span>
            <span className="md:text-[1.5rem]">
              (โพส-ยาหยี) คือโปรแกรมจัดการหน้าร้านที่ออกแบบ
              มาเพื่อร้านขายของชำร้านเล็กๆที่อยากได้เทคโนโลยีช่วยในกิจการ
              ด้วยการใช้งานที่แสนเรียบง่ายและราคาสบายกระเป๋า
            </span>
          </div>
          <div className="lg:pl-3 lg:flex lg:flex-row lg:gap-6 flex flex-col px-2">
            <button className="mt-4 hover:bg-[#4c49eddb] lg:w-[250px] h-[55px] border rounded-[115.385px;] bg-[#4C49ED] text-white shadow-md">
              <p>ทดลองใช้งานฟรี 30 วัน</p>
            </button>
            <button className="mt-4 lg:w-[250px] h-[55px] border rounded-[115.385px;] text-[#4C49ED] shadow-md hover:bg-[#dbdbdb69]">
              <p>สอบถามข้อมูลเพิ่มเติม</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Hero;
