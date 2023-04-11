import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useCookies } from "react-cookie";

const useAuthentication = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [cookies] = useCookies(["user"]);

  const checkIsLoggedIn = useCallback(() => {
    let userData = user || cookies["user"]?.user;
    if (!!!userData) {
      router.push("/");
      return false;
    } else {
      return true;
    }
  }, [user, cookies, router]);

  return { checkIsLoggedIn };
};

export default useAuthentication;
