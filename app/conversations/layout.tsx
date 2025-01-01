import React from 'react'
import SideBar from "@/components/sideBar";
import getConversations from "@/actions/getConversation";
import ConversationList from "@/components/conversationList";
import getUsers from "@/actions/getUsers";

const Layout = async ({children}: { children: React.ReactNode; }) => {
      const conversations = await getConversations();
      const users = await getUsers();
      return (
          <SideBar>
                <div className="h-full">
                      <ConversationList users={users}   initialItems={conversations} />
                      {children}
                </div>
          </SideBar>
      )
}
export default Layout
