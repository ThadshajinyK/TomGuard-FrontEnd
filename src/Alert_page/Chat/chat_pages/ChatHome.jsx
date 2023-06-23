import "../style.scss";
import ChatSidebar from "./../chat_components/ChatSidebar";
import Chat from "./../chat_components/Chat";
const ChatHome = () => {
  return (
    <div className="chatHome">
      <div className="chatContainer">
        <ChatSidebar />
        <Chat />
      </div>
    </div>
  );
};
export default ChatHome;
