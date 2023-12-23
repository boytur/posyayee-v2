import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChooseSeller() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [newStore, setNewStore] = useState(true);

  useEffect(() => {
    const userAready = sessionStorage.getItem("userStore");
    if (userAready == "[]") {
      setNewStore(true);
      navigate("/new-store");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>ChooseSeller</div>;
}

export default ChooseSeller;
