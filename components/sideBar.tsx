import React from 'react'
import DesktopSidebar from "@/components/desktopSidebar";
import MobileSidebar from "@/components/mobileSidebar";
import getCurrentUser from "@/actions/getCurrentUser";

const SideBar = async ({ children }: { children: React.ReactNode }) => {
      const currentUser = await getCurrentUser();
      return (
          <div className='h-full'>
                <DesktopSidebar currentUser={currentUser!}/>
                <MobileSidebar/>
                <main className='lg:pl-20 h-full'>{children}</main>
          </div>
      )
}
export default SideBar
