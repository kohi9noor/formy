"use client";
import { Button } from "@/components/ui/button";

import {
  LibraryBig,
  LineChart,
  MenuIcon,
  MessageSquare,
  Shield,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const SideNav = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const menuList = [
    {
      id: 1,
      name: "My Form",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Response ",
      icon: MessageSquare,
      path: "/dashboard/response",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <div className="h-screen shadow-md border">
      <div className=" p-4">
        {menuList.map((menu) => {
          return (
            <h2
              className={`p-4 hover:bg-blue-600 hover:text-white cursor-pointer mb-3 m-5 flex items-center gap-3 *:
                ${
                  path.includes(menu.path) !== false && `bg-blue-500 text-white`
                }
                `}
              key={menu.name}
            >
              <menu.icon></menu.icon>
              {menu.name}
            </h2>
          );
        })}
      </div>
      <div className=" fixed bottom-20 p-6 w-64 mx-auto text-black">
        <Button className=" w-full bg-blue-600 text-white hover:text-black">
          + Create form
        </Button>
        <div className=" my-7">
          <Progress className="bg-blue-600" value={10} />
          <h2 className=" text-sm text-center mt-2 text-gray-600">
            <strong className="mx-2">2</strong>Out of
            <strong className="mx-2">3</strong>
            file Create
          </h2>

          <h2 className=" text-sm text-center mt-2 text-gray-600">
            upradge Your plan for for ulimted Ai form build
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
