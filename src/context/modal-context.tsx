"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  openCreationModal: () => void;
  closeCreationModal: () => void;
  isCreationModalOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const openCreationModal = () => setIsCreationModalOpen(true);
  const closeCreationModal = () => setIsCreationModalOpen(false);

  return (
    <ModalContext.Provider value={{ isCreationModalOpen, openCreationModal, closeCreationModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};