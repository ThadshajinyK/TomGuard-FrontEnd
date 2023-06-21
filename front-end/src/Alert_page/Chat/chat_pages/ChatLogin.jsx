import "../style.scss";
import {useState} from "react"
import { useNavigate ,Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
const ChatLogin = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = e.target[0].value;
    const password = e.target[1].value;
   

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="chatlogo">Admin Chat</span>
        <span className="title">Login</span>
        <form action="" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
        </form>
        <p style={{fontSize:"15px"}}>Don't you have an account?<Link to="/chatRegister">Register</Link> </p>
        {err && <span style={{color:"red"}}>Something went wrong</span>}
      </div>
    </div>
  );
};
export default ChatLogin;
