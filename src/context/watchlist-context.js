import { createContext } from "react";

const watchListContext = createContext({
  items: [],
  addToWatchList: (item) => {},
  removeFromWatchList: (id) => {}
});

export default watchListContext;