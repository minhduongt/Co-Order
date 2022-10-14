import { CartContext } from "contexts/CartContext";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useCartContext = () => useContext(CartContext);

export default useCartContext;
