import io from "socket.io-client";

import { Navbar } from "../home/navbar/Navbar";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import axios from "axios";

const socket = io("http://localhost:3000",{  });

export const Chat = () => {
  
  const auth: any = useAuthUser();
  const [follow, setFollow] = useState<any>();
  const [followers, setFollowers] = useState<any>();
  const [chatIds, setChatId] = useState<any>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>();

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/user/getFollow",
        {},
        { headers: { "x-access-token": auth().token } }
      )
      .then((folls: any) => {
        setFollow(folls.data.user);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/user/getFollowers",
        {},
        { headers: { "x-access-token": auth().token } }
      )
      .then((folls: any) => {
        setFollowers(folls.data.user);
      });
  }, []);
  
  const userChatClick = async (e: any) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/chat/createChatRoom", { otherWalletAddr: e.target.id }, {
      headers: { "x-access-token": auth().token }
    })
    const chatId = await axios.post("http://localhost:3000/chat/findChatRoomUser",{},{
      headers:{"x-access-token":auth().token}
    })
    setChatId(chatId.data.chat[0][0].id)
    
  }
   const Clickpost = async (e: any) => {
    e.preventDefault()
    socket.emit(chatIds,message)
    const chat = await axios.post("http://localhost:3000/chat/createUserMessage",{chatId:chatIds,message},{
      headers:{"x-access-token":auth().token}
      
    })
  
  useEffect(()=> {
    const chat =  axios.post("http://localhost:3000/chat/findChatMessages",{chatId:chatIds},{
      headers:{"x-access-token":auth().token}
    }).then((data:any)=> {
      setMessages(data.data.chat)
    })
    //setMessages()
    
  },[Clickpost])
 
    
    
    setMessage('')
  };
  

console.log(messages)

  return (
    <>
      <Navbar />

      <nav className="navigation scroll-bar">
        <div className="container ps-0 pe-0">
          <div className="nav-content">
            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
              <div className="nav-caption fw-600 font-xssss text-grey-500">
                <span>Followers </span>
              </div>
              <ul className="mb-1 top-content">
                {follow &&
                  follow.map((fol: any, key: any) => (
                    <li key={key}>
                      <a
                        onClick={userChatClick}
                        href=""
                        id={fol[0].id}

                        className="nav-content-bttn open-font"
                      >
                        <span id={fol[0].id}>
                          {fol[0].name} {fol[0].surname}
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
              <div className="nav-caption fw-600 font-xssss text-grey-500">
                <span>Followers </span>
              </div>
              <ul className="mb-1 top-content">
                {followers &&
                  followers.map((fol: any, key: any) => (
                    <li key={key}>
                      <a
                        href=""
                        onClick={userChatClick}
                        id={fol[0].id}

                        className="nav-content-bttn open-font"
                      >
                        <span id={fol[0].id}>
                          {fol[0].name} {fol[0].surname}
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div
            className="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0"
            style={{ maxWidth: "100%" }}
          >
            <div className="row">
              <div className="col-lg-12 position-relative">
                <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                  <div className="chat-body p-3 ">
                    <div className="messages-content pb-5">
                      {messages }
                        <div className="message-item outgoing-message"
                          
                    >
                        <div className="message-wrap text-black">
                          
                        </div>
                      </div>
                      
                      

                      <div className="message-item">
                        <div className="message-wrap">

                        </div>
                      </div>


                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div
                  className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg"
                  style={{ width: "98%;" }}
                >
                  <form className="chat-form form-group">
                    <div className="">
                      <input
                        type="text"
                        placeholder="Start typing.."
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="text-black"
                        style={{ width: "75%" }}
                      />
                      <button onClick={Clickpost} className="bg-current">
                        <i className="ti-arrow-right text-black"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
