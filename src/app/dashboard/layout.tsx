"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./components/sidebar/sidebar";
import { DashNavbar } from "./components/navbar/dash-navbar";
import { CreationHubModal } from "@/components/modals/creation-hub-modal";
import { ModalProvider, useModal } from "@/context/modal-context";

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isCreationModalOpen, closeCreationModal, openCreationModal } = useModal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#000000] text-white">
      <Sidebar
        onCreateClick={openCreationModal}
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper: offset by sidebar width on md+ */}
      <div className="flex-1 flex flex-col md:pl-[280px] min-w-0">
        <DashNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 sm:p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>

      <CreationHubModal
        isOpen={isCreationModalOpen}
        onClose={closeCreationModal}
        onSelectPaymentLink={() => {
          router.push("/dashboard/create-payment-link");
          closeCreationModal();
        }}
        onSelectInvoice={() => {
          router.push("/dashboard/create-invoice");
          closeCreationModal();
        }}
      />
    </div>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <DashboardContent>{children}</DashboardContent>
    </ModalProvider>
  );
}
