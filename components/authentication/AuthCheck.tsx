import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Loading from "./Loading";
import Authenticate from "./index";
import useAuthContext from "hooks/useAuthContext";

function AuthCheck({ children }: any) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    if (user) {
      return children;
    } else {
      return <Authenticate />;
    }
  }, [user]);

  if (user) {
    return children;
  } else if (!user && !loading) {
    return <Authenticate />;
  } else {
    return <Loading />;
  }
}

export default AuthCheck;
