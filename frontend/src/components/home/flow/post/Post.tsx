import { useRef, useState, useEffect } from "react";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import axios from "axios";


export const Post = () => {
    const isAuth = useIsAuthenticated();
    const auth: any = useAuthUser();
    const [post, setPosts] = useState<any>();
    useEffect(() => {
      if(isAuth()) {
        axios.get("http://localhost:3000/post/").then((posts: any) => {
          setPosts(posts.data.post);
        });
      }
      },[]);
    return (
        <>
        

        {post ? (
            post.map((ps: any, key: any) =>
              ps[0].image ? (
                <div
                  key={key}
                  className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                >
                  <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3">
                      <img
                        src="https://via.placeholder.com/50x50.png"
                        alt="image"
                        className="shadow-sm rounded-circle w45"
                      />
                    </figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                      {ps[1].name} {ps[1].surname}
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {ps[1].date}
                      </span>
                    </h4>
                    <a
                      href="#"
                      className="ms-auto"
                      id="dropdownMenu5"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg"
                      aria-labelledby="dropdownMenu5"
                    >
                      <div className="card-body p-0 d-flex">
                        <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                          Save Link{" "}
                          <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                            Add this to your saved items
                          </span>
                        </h4>
                      </div>
                      <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                          Hide Post{" "}
                          <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                            Save to your saved items
                          </span>
                        </h4>
                      </div>
                      <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                          Hide all from Group{" "}
                          <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                            Save to your saved items
                          </span>
                        </h4>
                      </div>
                      <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                        <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">
                          Unfollow Group{" "}
                          <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                            Save to your saved items
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                    <a href="#" className="roadtri">
                      <img
                        src={
                          "http://localhost:3000/public/posts/" +
                          ps[0].image
                        }
                        alt=""
                        style={{ maxWidth: "615px", maxHeight: "350" }}
                      />
                    </a>
                  </div>
                  <div className="card-body p-0 me-lg-5">
                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                      {ps[0].description}
                    </p>
                  </div>
                  <div className="card-body d-flex p-0">
                    <a
                      href="#"
                      className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                    >
                      <i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>{" "}
                      <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>
                      2.8K Like
                    </a>
                    <div className="emoji-wrap">
                      <ul className="emojis list-inline mb-0">
                        <li className="emoji list-inline-item">
                          <i className="em em---1"></i>{" "}
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-angry"></i>
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-anguished"></i>{" "}
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-astonished"></i>{" "}
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-blush"></i>
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-clap"></i>
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-cry"></i>
                        </li>
                        <li className="emoji list-inline-item">
                          <i className="em em-full_moon_with_face"></i>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                    >
                      <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                      <span className="d-none-xss">22 Comment</span>
                    </a>
                    <a
                      href="#"
                      className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                    >
                      <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                      <span className="d-none-xs">Share</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    key={key}
                    className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0"
                  >
                    <div className="card-body p-0 d-flex">
                      <figure className="avatar me-3 m-0">
                        <img
                          src="https://via.placeholder.com/50x50.png"
                          alt="image"
                          className="shadow-sm rounded-circle w45"
                        />
                      </figure>
                      <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        {ps[1].name} {ps[1].surname}
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {ps[1].date}
                        </span>
                      </h4>
                      <a
                        href="#"
                        className="ms-auto"
                        id="dropdownMenu6"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                        aria-labelledby="dropdownMenu6"
                      >
                        <div className="card-body p-0 d-flex">
                          <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                          <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                            Save Link{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                              Add this to your saved items
                            </span>
                          </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                          <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                          <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                            Hide Post{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                              Save to your saved items
                            </span>
                          </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                          <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                          <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                            Hide all from Group{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                              Save to your saved items
                            </span>
                          </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                          <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                          <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">
                            Unfollow Group{" "}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                              Save to your saved items
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0 me-lg-5">
                      <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
                        {ps[0].description}
                      </p>
                    </div>
                    <div className="card-body d-flex p-0">
                      <a
                        href="#"
                        className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                      >
                        <i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>{" "}
                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>
                        2.8K Like
                      </a>
                      <div className="emoji-wrap">
                        <ul className="emojis list-inline mb-0">
                          <li className="emoji list-inline-item">
                            <i className="em em---1"></i>{" "}
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-angry"></i>
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-anguished"></i>{" "}
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-astonished"></i>{" "}
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-blush"></i>
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-clap"></i>
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-cry"></i>
                          </li>
                          <li className="emoji list-inline-item">
                            <i className="em em-full_moon_with_face"></i>
                          </li>
                        </ul>
                      </div>
                      <a
                        href="#"
                        className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                      >
                        <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                        <span className="d-none-xss">22 Comment</span>
                      </a>
                      <a
                        href="#"
                        id="dropdownMenu31"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                      >
                        <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                        <span className="d-none-xs">Share</span>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                        aria-labelledby="dropdownMenu31"
                      >
                        <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                          Share{" "}
                          <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i>
                        </h4>
                        <div className="card-body p-0 d-flex">
                          <ul className="d-flex align-items-center justify-content-between mt-2">
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-facebook"
                              >
                                <i className="font-xs ti-facebook text-white"></i>
                              </a>
                            </li>
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-twiiter"
                              >
                                <i className="font-xs ti-twitter-alt text-white"></i>
                              </a>
                            </li>
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-linkedin"
                              >
                                <i className="font-xs ti-linkedin text-white"></i>
                              </a>
                            </li>
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-instagram"
                              >
                                <i className="font-xs ti-instagram text-white"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="btn-round-lg bg-pinterest"
                              >
                                <i className="font-xs ti-pinterest text-white"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body p-0 d-flex">
                          <ul className="d-flex align-items-center justify-content-between mt-2">
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-tumblr"
                              >
                                <i className="font-xs ti-tumblr text-white"></i>
                              </a>
                            </li>
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-youtube"
                              >
                                <i className="font-xs ti-youtube text-white"></i>
                              </a>
                            </li>
                            <li className="me-1">
                              <a
                                href="#"
                                className="btn-round-lg bg-flicker"
                              >
                                <i className="font-xs ti-flickr text-white"></i>
                              </a>
                            </li>
                            <li className="me-1">
                              <a href="#" className="btn-round-lg bg-black">
                                <i className="font-xs ti-vimeo-alt text-white"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="btn-round-lg bg-whatsup"
                              >
                                <i className="font-xs feather-phone text-white"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">
                          Copy Link
                        </h4>
                        <i className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500"></i>
                        <input
                          type="text"
                          value="https://socia.be/1rGxjoJKVF0"
                          className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                </>
              )
            )
          ) : (
            <div>Loading...</div>
          )}
           </>
    )
}