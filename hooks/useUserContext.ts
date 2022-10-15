import { UserContext } from "contexts/UserContext";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useUserContext = () => useContext(UserContext);

export default useUserContext;
