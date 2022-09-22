import React from "react";
import "../css/Header.css";
import Logo from "../images/animixPlay.webp";
import Badge from "@mui/material/Badge";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useContext } from "react";
import watchListContext from "../context/watchlist-context";
import WatchListModal from "./ModalCart";

const Header = () => {
  const { items } = useContext(watchListContext);
  return (
    <div className="header">
      <img src={Logo} alt="logo" className="image" />
      <WatchListModal>
        <Badge
          badgeContent={items.length}
          color="primary"
          style={{
            marginRight: "2rem",
          }}
        >
          <YouTubeIcon
            style={{
              color: "white",
              fontSize: "2.1rem",
              cursor: "pointer",
            }}
          />
        </Badge>
      </WatchListModal>
    </div>
  );
};

export default Header;
