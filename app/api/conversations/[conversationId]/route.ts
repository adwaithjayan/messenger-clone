import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import {pusherServer} from "@/lib/pusher";

interface IParams {
      conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
      try {
            const { conversationId } = params;
            const currentUser = await getCurrentUser();

            if (!currentUser?.id) {
                  return new NextResponse("Unauthorized", { status: 401 });
            }

            const existingConversation = await prisma.conversation.findUnique({
                  where: {
                        id: conversationId,
                  },
                  include: {
                        users: true,
                        messages: true,
                  },
            });

            if (!existingConversation) {
                  return new NextResponse("Invalid ID", { status: 400 });
            }

            await prisma.message.deleteMany({
                  where: {
                        conversationId: conversationId,
                  },
            });

            const deletedConversation = await prisma.conversation.deleteMany({
                  where: {
                        id: conversationId,
                        userIds: {
                              hasSome: [currentUser.id],
                        },
                  },
            });

            existingConversation.users.forEach((user) => {
                  if(user.email){
                        pusherServer.trigger(user.email,'conversation:remove',existingConversation)
                  }
            })

            return NextResponse.json(deletedConversation);
      } catch (error: any) {
            console.log("CONVERSATION_DELETE_ERROR", error?.message);
            return new NextResponse("Internal Server Error", { status: 500 });
      }
}