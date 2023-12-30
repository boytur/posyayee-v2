export const auth = (response, next) => {
  // ตรวจสอบว่ามีการเปิดใช้งานบราวเซอร์หรือไม่
  if (typeof window !== "undefined") {
    // บันทึกข้อมูลใน sessionStorage
    sessionStorage.setItem("userToken", JSON.stringify(response.data[0].userToken));
    sessionStorage.setItem("userStore", JSON.stringify(response.data[0].userStore));
    sessionStorage.setItem("packageName", JSON.stringify(response.data[0].packageName));
    sessionStorage.setItem("storeName", JSON.stringify(response.data[0].storeName));
    sessionStorage.setItem("storeRemaining", JSON.stringify(response.data[0].storeRemaining));
  }

  // ส่งต่อไปยังฟังก์ชั่นถัดไป (next)
  next();
};