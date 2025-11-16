import React from "react";
import { Routes, Route } from "react-router-dom";
import ListAds from "./pages/ListAds/ListAds";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import Stats from "./pages/Stats/Stats";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListAds />} />
      <Route path="/item/:id" element={<ItemDetail />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
