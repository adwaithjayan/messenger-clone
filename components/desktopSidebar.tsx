"use client"
import useRoutes from "@/hooks/useRoutes";
import React, {useState} from "react";
import DesktopItem from "@/components/desktopItem";
import Avatar from "@/components/avatar";
import {User} from "@prisma/client";
import SettingsModal from "@/components/settingsSideBar";

interface DesktopSidebarProps {
      currentUser: User;
}

const DesktopSidebar:React.FC<DesktopSidebarProps> = ({currentUser}) => {
      const routes =useRoutes();
      const [isOpen, setIsOpen] = useState(false);
      return (
          <>
                <SettingsModal currentUser={currentUser}
                               isOpen={isOpen}
                               onClose={() => setIsOpen(false)}/>
                <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between">
                      <ul role="list" className="flex flex-col items-center space-y-1">
                            {routes.map((item) => (
                                <DesktopItem key={item.label}
                                             label={item.label}
                                             href={item.href}
                                             onClick={item.onClick}
                                             icon={item.icon}
                                             active={item.active}
                                />
                            ))}
                      </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                      <div
                          className="cursor-pointer hover:opacity-75 transition"
                          onClick={() => setIsOpen(true)}
                      >
                            <Avatar user={currentUser}/>
                      </div>
                </nav>
          </div></>
      )
}
export default DesktopSidebar
