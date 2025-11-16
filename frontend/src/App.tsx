import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes.tsx";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AppRoutes />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;
