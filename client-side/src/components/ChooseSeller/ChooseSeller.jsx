import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChooseSeller.css";
import axios from "axios";
import { config } from "../../config";

function ChooseSeller() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_KEY;
  const [userStore, setUserStore] = useState([]);

  const fetchUserInStore = async () => {
    try {
      const response = await axios.get(
        `${API}/api/store/view-employee`,
        config
      );
      setUserStore(response.data.userStore);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  useEffect(() => {
    const userAlready = sessionStorage.getItem("userStore");
    if (userAlready === "[]") {
      navigate("/new-store");
    } else {
      fetchUserInStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chooseSeller-background">
      <div className=" text-[3rem] text-center text-white pt-10 font-bold">
        <h1>กรุณาเลือกคนขายค่ะ</h1>
      </div>
      <div className="text-white flex justify-center pt-20 items-center"
       style={{ height: "calc(100vh - 20rem)" }}>
        <div className=" flex gap-12">
          {userStore.map((user) => (
            <div key={user.userStoreId} className="w-full">
              <div className="w-[10rem] rounded-lg object-cover cursor-pointer hover:scale-105">
                <img
                  className=" w-full h-[10rem] object-cover rounded-lg "
                  src={user?.userStoreImagePath || 'https://w7.pngwing.com/pngs/663/844/png-transparent-computer-icons-others-human-body-symbol-person.png'}
                  alt={user.userStoreName}
                />
              </div>
              <div className="text-center text-[1.5rem] pt-5">
                <h2>{user.userStoreName}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseSeller;
