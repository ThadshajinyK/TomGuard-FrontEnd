import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from './../context/AuthContext';

const ChatNavbar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="chatNavbar">
      <span className="chatlogo">Admin Chat</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  );
};
export default ChatNavbar;
