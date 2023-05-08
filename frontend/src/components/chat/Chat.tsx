import io from "socket.io-client";

import { Navbar } from "../home/navbar/Navbar";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import axios from "axios";

const socket = io("http://localhost:3000");

export const Chat = () => {
  const auth: any = useAuthUser();
  const [follow, setFollow] = useState<any>();
  const [followers, setFollowers] = useState<any>();
  const [chatIds, setChatId] = useState<any>();
  const [chatMessage, setChatMessage] = useState<any>();
  const [chatMessageUsers, setChatMessageUser] = useState<any>();
  const [message, setMessage] = useState<any>();

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
  const clickPost = (e: any) => {
    e.preventDefault();
    axios.post(
      "http://localhost:3000/chat/createUserMessage",
      { chatId: chatIds, message: message },
      { headers: { "x-access-token": auth().token } }
    );
  };
  const clickFollows = async (e: any) => {
    e.preventDefault();
    const chatId = await axios.post(
      "http://localhost:3000/chat/userRoom",
      {
        otherWalletAddr: e.target.id,
      },
      { headers: { "x-access-token": auth().token } }
    );
    setChatId(chatId.data.chat[0][0].id);
  };
  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/chat/findChatMessages",
        { chatId: chatIds },
        { headers: { "x-access-token": auth().token } }
      )
      .then((chatMessages: any) => {
        setChatMessage(chatMessages.data.chat.reverse());
      });

    axios
      .post(
        "http://localhost:3000/chat/findChatMessageUser",
        { chatId: chatIds },
        { headers: { "x-access-token": auth().token } }
      )
      .then((chatUserMessage: any) => {
        setChatMessageUser(chatUserMessage.data.chat.reverse());
      });
  }, [clickFollows]);
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
                        href=""
                        id={fol[0].id}
                        onClick={clickFollows}
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
                        id={fol[0].id}
                        onClick={clickFollows}
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
                      {chatMessage &&
                        chatMessage.map((mess: any, key: any) => (
                          <>
                            {chatMessageUsers ? (
                              chatMessageUsers.map((usMess: any) => (
                                <>
                                  {usMess[0].id == mess[0].id ? (
                                    <>
                                
                                    <div
                                      className="message-item outgoing-message"
                                      key={key}
                                    >
                                      <div className="message-wrap text-black">
                                        {mess[0].message}
                                      </div>
                                    </div>
                                    </>
                                  ) : (
                                    <div className="message-item">
                                      <div className="message-wrap">
                                        {mess[0].message}
                                      </div>
                                    </div>
                                  )}
                                </>
                              ))
                            ) : (
                              <></>
                            )}
                          </>
                        ))}

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
                      <button onClick={clickPost} className="bg-current">
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
