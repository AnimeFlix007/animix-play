import React, { useState } from "react";
import watchListContext from "./watchlist-context";

const WatchListProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const additem = (item) => {
    setCart([...cart, item]);
  };
  const removeItem = (id) => {
    setCart(
      cart.filter((item) => {
        return item.id !== id;
      })
    );
  };
  const watchList = {
    items: cart,
    addToWatchList: additem,
    removeFromWatchList: removeItem,
  };
  return (
    <watchListContext.Provider value={watchList}>
      {children}
    </watchListContext.Provider>
  );
};

export default WatchListProvider;
