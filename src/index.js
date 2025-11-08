import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Header from "./Component/Header";
import Menu from "./Component/Menu";
import PizzaMenu from "./Pizza";     // keep only this (remove 'Pizza')
import Footer from "./Component/Footer";
import ThemeFab from "./Component/ThemeFab";   // if you added the dark-mode button



function App() {
  return (
    <div>
      <Header title={"Weijie's Pizza Co."} subtitle={"Freshly baked. Always made with passion"}/>
      <Menu />
      <PizzaMenu />
      <Footer />
      <ThemeFab />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
