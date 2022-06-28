import styles from "../styles/chatView.module.css";
import { ChatHeader, MessageForm } from ".";
import { useContext } from "react";
import { DiscordContext } from "../context/context";
import { MessageCard } from "./MessageCard";

export const ChatView = () => {
  const { state } = useContext(DiscordContext);

  const formattedMessageArray = () => {
    const uniqueArray = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value);

      return (
        index ===
        state.messages.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });
    return uniqueArray;
  };
  return (
    <div className={styles.chatView}>
      <ChatHeader />
      <div className={styles.messagesContainer}>
        {formattedMessageArray().map((message, index) => (
          <MessageCard
            tag={index}
            avatar={message.avatar}
            sender={message.sender}
            timestamp={message.createdAt}
            content={message.content}
          />
        ))}
      </div>
      <MessageForm />
    </div>
  );
};
