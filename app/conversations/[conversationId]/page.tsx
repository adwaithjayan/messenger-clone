import getConversationById from "@/actions/getConversationById";
import EmptyState from "@/components/emptyState";
import getMessages from "@/actions/getMessages";
import Form from "@/components/form";
import Header from "@/components/header";
import Body from "@/components/body";

interface IParams {
      conversationId: string;
}

const Page = async ({ params }: { params: IParams }) => {
      const { conversationId } =await params;

      if (!conversationId) {
            throw new Error("Conversation ID is required.");
      }
      const conversation = await getConversationById(conversationId);
      const messages = await getMessages(conversationId);

      if (!conversation) {
            return (
                <div className="lg:pl-80 h-full">
                      <div className="h-full flex flex-col">
                            <EmptyState />
                      </div>
                </div>
            );
      }

      return (
          <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                      <Header conversation={conversation}/>
                      <Body initialMessages={messages}/>
                      <Form/>
                </div>
          </div>
      )
}
export default Page
