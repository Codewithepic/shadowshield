import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  userName?: string;
  isAuthenticated?: boolean;
  notificationCount?: number;
  activePath?: string;
}

const Layout = ({
  children,
  userName = "Agent Smith",
  isAuthenticated = true,
  notificationCount = 3,
  activePath = "/",
}: LayoutProps) => {
  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-black text-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar
        userName={userName}
        isAuthenticated={isAuthenticated}
        notificationCount={notificationCount}
      />

      <div className="flex flex-1 pt-20">
        <Sidebar activePath={activePath} />

        <main className="flex-1">{children}</main>
      </div>
    </motion.div>
  );
};

export default Layout;
