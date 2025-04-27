import { createContext, useContext, useState } from "react";
import * as api from "../services/api/cartApi";
import { getBagById } from "../services/api/bagApi";
import { useAuth } from "./AuthContext";
const CartContext = createContext();
const useCart = () => useContext(CartContext);
const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // load cart items for the current user
  const loadCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const cartItemsIDs = await api.getAllBagsInCartByUserID(user.id);
      //   get bag details for each item for each bagID
      const cartItems = await Promise.all(
        cartItemsIDs.map((id) => getBagById(id))
      );
      setItems(cartItems);
      setLoading(false);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  //   load cart when user changes
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  //   add item to cart
  const addToCart = async (bagId) => {
    try {
      await api.addBagToCart({
        userID: user.id,
        bagID: bagId,
      });
      await loadCart();
    } catch (error) {
      console.error("Error adding bag to cart:", error);
    }
  };

  const removeFromCart = async (bagId) => {
    try {
      await api.removeBagFromCart({
        userID: user.id,
        bagID: bagId,
      });
      await loadCart();
    } catch (error) {
      console.error("Error removing bag from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ items, loading, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { useCart };
export default CartProvider;
// This code defines a CartContext that manages the shopping cart state in a React application.
