"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./messageBox";
import {pusherClient} from "@/lib/pusher";
import {util} from "zod";
import {find} from 'lodash'

interface BodyProps {
      initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
      const [messages, setMessages] = useState(initialMessages);
      const bottomRef = useRef<HTMLDivElement>(null);

      const { conversationId } = useConversation();

      useEffect(() => {
            axios.post(`/api/conversations/${conversationId}/seen`);
      }, [conversationId]);

      useEffect(() => {
            pusherClient.subscribe(conversationId);
            bottomRef?.current?.scrollIntoView();
            const messageHandler =(message:FullMessageType)=>{
                  axios.post(`/api/conversations/${conversationId}/seen`);
                  setMessages((prev)=>{
                        if(find(prev,{id:message.id})){
                              return prev
                        }
                        return [...prev,message]
                  })
            bottomRef?.current?.scrollIntoView();
            };
            const updatedMessageHandler = (newMessage: FullMessageType) => {
                  setMessages((prevMessages) => {
                        return prevMessages.map((prevMessage) => {
                              if (prevMessage.id === newMessage.id) {
                                    return newMessage;
                              }

                              return prevMessage;
                        });
                  });
            };
            pusherClient.bind("messages:new", messageHandler);
            pusherClient.bind("messages:update", updatedMessageHandler);

            return () => {
                  pusherClient.unsubscribe(conversationId);
                  pusherClient.unbind("messages:new", messageHandler);
                  pusherClient.unbind("messages:update", updatedMessageHandler);
            };
      }, [conversationId]);

      return (
          <div className="flex-1 overflow-y-auto">
                {messages.map((message, i) => (
                    <MessageBox
                        key={message.id}
                        data={message}
                        isLast={i === messages.length - 1}
                    />
                ))}
                <div ref={bottomRef} className="pt-24" />
          </div>
      );
};

export default Body;