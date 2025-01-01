import React from 'react'
import SideBar from "@/components/sideBar";
import UserList from "@/components/userList";
import getUsers from "@/actions/getUsers";

const Layout = async ({ children }: { children: React.ReactNode }) => {
      const users = await getUsers();
      return (
          <SideBar>
                  <div className='h-full'>
                        <UserList items={users}/>
                        {children}
                  </div>
          </SideBar>
      )
}
export default Layout
