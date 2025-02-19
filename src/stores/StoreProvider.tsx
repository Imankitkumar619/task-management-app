"use client";

import { createContext, useContext } from "react";
import { onSnapshot, getSnapshot } from "mobx-state-tree";
import { taskStore, TaskStore, updateTaskStoreWithSnapshot } from "./TaskStore";
import { AuthProvider } from "@/context/AuthContext";

const StoreContext = createContext({ taskStore });

// Update the taskStore with the initial snapshot
if (process.browser) {
  const initialSnapshot = localStorage.getItem("taskStore");
  if (initialSnapshot) {
    updateTaskStoreWithSnapshot(JSON.parse(initialSnapshot));
  }
}

// Synchronize the store with local storage
onSnapshot(taskStore, (snapshot) => {
  localStorage.setItem("taskStore", JSON.stringify(snapshot));
});

export const StoreProvider = ({ children }: any) => {
  const stores = {
    taskStore,
  };

  return (
    <AuthProvider>
          <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>

    </AuthProvider>
  );
};

export const useStore = () => useContext(StoreContext);
