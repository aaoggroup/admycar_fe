import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/all_campaigns");
    }, 3000);
  }, []);

  return (
    <div>
      <img src="images/success.gif" alt="" />
    </div>
  );
}

export default SuccessPage;
