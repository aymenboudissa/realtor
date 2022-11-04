import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [checkingStatus, setCheckingStatus] = React.useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
