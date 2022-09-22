import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";

const classStyle = {
  bottomNavbar: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#111",
    zIndex: 100,
  },
  icons: {
    color: "#fff"
  }
};

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (value === 0) navigate("/trending");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/tv");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        style={classStyle.bottomNavbar}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={classStyle.icons}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={classStyle.icons}
          label="Movies"
          icon={<MovieCreationIcon />}
        />
        <BottomNavigationAction
          style={classStyle.icons}
          label="TV"
          icon={<LiveTvIcon />}
        />
        <BottomNavigationAction
          style={classStyle.icons}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
