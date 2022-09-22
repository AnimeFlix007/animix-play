import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";
import "./App.css";
import React from "react";
import { Container } from "@mui/material";
import Router from "./router/Router";
import WatchListProvider from "./context/WatchListProvider";

const App = () => {
  return (
    <WatchListProvider>
      <Header />
      <div className="app dark">
        <Container>
          <Router />
        </Container>
      </div>
      <BottomNavbar />
    </WatchListProvider>
  );
}

export default App;
