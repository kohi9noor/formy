import { SignedIn } from "@clerk/nextjs";
import { Sidebar } from "lucide-react";
import React from "react";
import SideNav from "./_components/SideNav";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignedIn>
      <div>
        <div className=" md:w-64 fixed">
          <SideNav />
        </div>
        <div className="md:ml-64">{children}</div>
      </div>
    </SignedIn>
  );
};

export default Dashboard;
