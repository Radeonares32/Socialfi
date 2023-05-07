import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import axios from 'axios'

export const Sidebar = () => {
  const auth: any = useAuthUser();
  const isAuth = useIsAuthenticated();
  const [follow,setFollow] = useState<any>()
  useEffect(() => {
    if (isAuth()) {
      axios
        .post(
          "http://localhost:3000/user/userFollows",
          {},
          {
            headers: { "x-access-token": auth().token },
          }
        )
        .then((users: any) => {
          setFollow(users.data.user);
          console.log(follow)
          
          
        });
    }
  });
  return (
    <>
     
        <>
            
                <>
        <div className="right-chat nav-wrap mt-2 right-scroll-bar" >
            <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
              <div className="preloader-wrap p-3">
                <div className="box shimmer">
                  <div className="lines">
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                  </div>
                </div>
                <div className="box shimmer mb-3">
                  <div className="lines">
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                  </div>
                </div>
                <div className="box shimmer">
                  <div className="lines">
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                  </div>
                </div>
              </div>
              {(isAuth() && follow) && (follow.slice(1).map((fol:any,key:any)=>(
              <div className="section full pe-3 ps-4 pt-4 position-relative feed-body" key={key} >
                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
                  {fol[0].name}
                </h4>
               
                    
                    <>
                    
                     <ul className="list-group list-group-flush" key={key}>
                  <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                    <figure className="avatar float-left mb-0 me-2">
                      <img
                        src="https://via.placeholder.com/50x50.png"
                        alt="image"
                        className="w35"
                      />
                    </figure>
                    <h3 className="fw-700 mb-0 mt-0">
                      <a
                        className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                        href="#"
                      >
                       
                      </a>
                    </h3>
                    <span className="badge badge-primary text-white badge-pill fw-500 mt-0">
                      2
                    </span>
                  </li>
                </ul>
                    </>
               
               
              </div>
                 )) )}
            </div>
          </div>
        
          <div className="app-footer border-0 shadow-lg bg-primary-gradiant" >
            <a href="default.html" className="nav-content-bttn nav-center">
              <i className="feather-home"></i>
            </a>
            <a href="default-video.html" className="nav-content-bttn">
              <i className="feather-package"></i>
            </a>
            <a
              href="default-live-stream.html"
              className="nav-content-bttn"
              data-tab="chats"
            >
              <i className="feather-layout"></i>
            </a>
            <a href="shop-2.html" className="nav-content-bttn">
              <i className="feather-layers"></i>
            </a>
            <a href="default-settings.html" className="nav-content-bttn">
              <img
                src="https://via.placeholder.com/50x50.png"
                alt="user"
                className="w30 shadow-xss"
              />
            </a>
          </div>
                </>
           
         


          <div className="modal-popup-chat">
            <div className="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
              <div className="modal-popup-header w-100 border-bottom">
                <div className="card p-3 d-block border-0 d-block">
                  <figure className="avatar mb-0 float-left me-2">
                    <img
                      src="https://via.placeholder.com/50x50.png"
                      alt="image"
                      className="w35 me-1"
                    />
                  </figure>
                  <h5 className="fw-700 text-primary font-xssss mt-1 mb-1">
                    Hendrix Stamp
                  </h5>
                  <h4 className="text-grey-500 font-xsssss mt-0 mb-0">
                    <span className="d-inline-block bg-success btn-round-xss m-0"></span>{" "}
                    Available
                  </h4>
                  <a
                    href="#"
                    className="font-xssss position-absolute right-0 top-0 mt-3 me-4"
                  >
                    <i className="ti-close text-grey-900 mt-2 d-inline-block"></i>
                  </a>
                </div>
              </div>
              <div className="modal-popup-body w-100 p-3 h-auto">
                <div className="message">
                  <div className="message-content font-xssss lh-24 fw-500">
                    Hi, how can I help you?
                  </div>
                </div>
                <div className="date-break font-xsssss lh-24 fw-500 text-grey-500 mt-2 mb-2">
                  Mon 10:20am
                </div>
                <div className="message self text-right mt-2">
                  <div className="message-content font-xssss lh-24 fw-500">
                    I want those files for you. I want you to send 1 PDF and 1
                    image file.
                  </div>
                </div>
                <div
                  className="snippet pt-3 ps-4 pb-2 pe-3 mt-2 bg-grey rounded-xl float-right"
                  data-title=".dot-typing"
                >
                  <div className="stage">
                    <div className="dot-typing"></div>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="modal-popup-footer w-100 border-top">
                <div className="card p-3 d-block border-0 d-block">
                  <div className="form-group icon-right-input style1-input mb-0">
                    <input
                      type="text"
                      placeholder="Start typing.."
                      className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
                    />
                    <i className="feather-send text-grey-500 font-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="app-header-search">
            <form className="search-form">
              <div className="form-group searchbox mb-0 border-0 p-1">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search..."
                />

                <a
                  href="#"
                  className="ms-1 mt-1 d-inline-block close searchbox-close"
                >
                  <i className="ti-close font-xs"></i>
                </a>
              </div>
            </form>
          </div>
        </>
      

      {/* <div className="section full pe-3 ps-4 pt-4 pb-4 position-relative feed-body">
                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">GROUPS</h4>
                <ul className="list-group list-group-flush">
                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                        
                        <span className="btn-round-sm bg-primary-gradiant me-3 ls-3 text-white font-xssss fw-700">UD</span>
                        <h3 className="fw-700 mb-0 mt-0">
                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">Studio Express</a>
                        </h3>
                        <span className="badge mt-0 text-grey-500 badge-pill pe-0 font-xsssss">2 min</span>
                    </li>
                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                        
                        <span className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">AR</span>
                        <h3 className="fw-700 mb-0 mt-0">
                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">Armany Design</a>
                        </h3>
                        <span className="bg-warning ms-auto btn-round-xss"></span>
                    </li>
                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                        
                        <span className="btn-round-sm bg-mini-gradiant me-3 ls-3 text-white font-xssss fw-700">UD</span>
                        <h3 className="fw-700 mb-0 mt-0">
                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">De fabous</a>
                        </h3>
                        <span className="bg-success ms-auto btn-round-xss"></span>
                    </li>
                </ul>
            </div>
            <div className="section full pe-3 ps-4 pt-0 pb-4 position-relative feed-body">
                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">Pages</h4>
                <ul className="list-group list-group-flush">
                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                        
                        <span className="btn-round-sm bg-primary-gradiant me-3 ls-3 text-white font-xssss fw-700">AB</span>
                        <h3 className="fw-700 mb-0 mt-0">
                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">Armany Seary</a>
                        </h3>
                        <span className="bg-success ms-auto btn-round-xss"></span>
                    </li>
                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                        
                        <span className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">SD</span>
                        <h3 className="fw-700 mb-0 mt-0">
                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">Entropio Inc</a>
                        </h3>
                        <span className="bg-success ms-auto btn-round-xss"></span>
                    </li>
                    
                </ul>
            </div> */}
    </>
  );
};
