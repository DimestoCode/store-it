import React from "react";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

import { getCurrentUser } from "@/lib/actions/user.actions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/sign-in");
  }

  console.log(currentUser.$id);
  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header accountId={currentUser.accountId} userId={currentUser.$id} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
