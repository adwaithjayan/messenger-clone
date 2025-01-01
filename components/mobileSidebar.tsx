"use client";
import React from "react";
import clsx from "clsx";
import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "@/components/mobileItem";

const MobileSidebar = () => {
      const routes = useRoutes();
      const { isOpen } = useConversation();

      if (isOpen) {
            null;
      }
      return (
          <div
              className={clsx(
                  `
    lg:hidden
    fixed
    justify-between
    w-full
    bottom-0
    z-40
    flex
    items-center
    bg-white
    border-t-[1px]
    `,
                  isOpen && "hidden"
              )}
          >
                {routes.map((route) => (
                    <MobileItem
                        key={route.href}
                        href={route.href}
                        onClick={route.onClick}
                        icon={route.icon}
                        active={route.active}
                    />
                ))}
          </div>
      );
};

export default MobileSidebar;