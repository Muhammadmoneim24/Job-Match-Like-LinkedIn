import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const ControlSidebarContext = createContext();

export function ControlSidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <ControlSidebarContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </ControlSidebarContext.Provider>
  );
}

export function useControlSidebarContext() {
  return useContext(ControlSidebarContext);
}
