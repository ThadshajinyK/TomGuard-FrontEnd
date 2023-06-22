import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useContext } from "react";
import { ChatContext } from './../context/ChatContext';

const Chat = () => {
  const {data} =  useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};
export default Chat;
