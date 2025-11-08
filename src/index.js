import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Header from "./Component/Header";
import Menu from "./Component/Menu";
import PizzaMenu from "./Pizza";     // keep only this (remove 'Pizza')
import Footer from "./Component/Footer";
import ThemeFab from "./Component/ThemeFab";   // if you added the dark-mode button

const pizzaItems = [
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato sauce, mozzarella, fresh spinach, and creamy ricotta cheese",
    price: 12,
    image: require("./assert/pizzas/spinaci.jpg"),
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato sauce, mozzarella, sautéed mushrooms, and oregano",
    price: 11,
    image: require("./assert/pizzas/funghi.jpg"),
  },
  {
    name: "Pizza Focaccia",
    ingredients: "Olive oil, rosemary, sea salt, and garlic — light and crispy base",
    price: 8,
    image: require("./assert/pizzas/focaccia.jpg"),
  },
  {
    name: "Pizza Margherita",
    ingredients: "Classic tomato sauce, fresh mozzarella, and basil leaves",
    price: 10,
    image: require("./assert/pizzas/margherita.jpg"),
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato sauce, mozzarella, Italian prosciutto, and rocket leaves",
    price: 14,
    image: require("./assert/pizzas/prosciutto.jpg"),
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato sauce, mozzarella, spicy salami, and fresh chili flakes",
    price: 13,
    image: require("./assert/pizzas/salamino.jpg"),
  },
];

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <PizzaMenu pizzaArray={pizzaItems} />
      <Footer />
      <ThemeFab />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
