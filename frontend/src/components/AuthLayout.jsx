import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/home");
    }
    setLoader(false);
  }, [navigate, authentication, authStatus]);

  return loader ? <p>loading...</p> : <>{children}</>;
}
