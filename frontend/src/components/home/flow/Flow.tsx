import { useRef, useState, useEffect } from "react";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import axios from "axios";
import { Post } from "./post/Post";

export const Flow = () => {
  const isAuth = useIsAuthenticated();
  const auth: any = useAuthUser();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>();
  const [post, setPosts] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [user, setUser] = useState<any>();
  const [follow, setFollow] = useState<any>();
  const [followers, setFollowers] = useState<any>();
  const [getFollow,setGetFollow] = useState<any>()
  const [getFollowers,setGetFollowers] = useState<any>()
  const fileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    alert("File uploaded");
    setImage(file);
  };
  const postClick = async () => {
    const formData = new FormData();
    formData.append("description", description as any);
    formData.append("title", "title");
    if (image) {
      formData.append("image", image as any);
      const post: any = await axios.post(
        "http://localhost:3000/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": auth().token,
          },
        }
      );
      if (post.data.post.message === "success created post") {
        alert("Post Create");
        setImage(null);
        setDescription("");
      }
    } else {
      const post: any = await axios.post(
        "http://localhost:3000/post/create",
        formData,
        {
          headers: {
            "x-access-token": auth().token,
          },
        }
      );
      if (post.data.post.message === "success created post") {
        alert("Post Create");
        setImage(null);
        setDescription("");
      }
    }
  };
  const clickFollow = async(e:any) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/user/postFollow',{otherWalletAddr:e.target.id},{
      headers:{'x-access-token':auth().token}
    })
  }
  useEffect(() => {
    if (isAuth()) {
      axios.get("http://localhost:3000/user/").then((users: any) => {
        setUser(users.data.user);
      });
    }
  }, [isAuth()]);
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
          
        });
    }
  },[isAuth,follow,clickFollow]);
  useEffect(() => {
    if (isAuth()) {
      axios
        .post(
          "http://localhost:3000/user/userFollowers",
          {},
          {
            headers: { "x-access-token": auth().token },
          }
        )
        .then((users: any) => {
          setFollowers(users.data.user);
        });
    }
  }, [isAuth,followers]);
  useEffect(()=>{
    if(isAuth()) {
      axios.post('http://localhost:3000/user/getFollow',{},{headers:{'x-access-token':auth().token}}).then((folls:any)=>{
        setGetFollow(folls.data.user)
      })
    }
  },[isAuth,clickFollow])
  useEffect(()=>{
    if(isAuth()) {
      axios.post('http://localhost:3000/user/getFollowers',{},{headers:{'x-access-token':auth().token}}).then((folls:any)=>{
        setGetFollowers(folls.data.user)
      })
    }
  },[followers,isAuth])
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
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
          <div className="row feed-body">
            <div className="col-xl-8 col-xxl-9 col-lg-8">
              <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                <div className="owl-carousel category-card owl-theme overflow-hidden nav-none">
                  {isAuth() ? (
                    <div className="item">
                      <div className="card w125 h200 d-block border-0 shadow-none rounded-xxxl bg-dark overflow-hidden mb-3 mt-3">
                        <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                          <a
                            href="#"
                            data-target="#Modalstries"
                            data-toggle="modal"
                          >
                            <span className="btn-round-lg bg-white">
                              <i className="feather-plus font-lg"></i>
                            </span>
                            <div className="clearfix"></div>
                            <h4 className="fw-700 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                              Add Story{" "}
                            </h4>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "none" }}></div>
                  )}

                  <div className="item">
                    <div
                      className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden mb-3 mt-3"
                      style={{
                        backgroundImage:
                          "url(https://via.placeholder.com/200x300.png);",
                      }}
                    >
                      <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                        <a
                          href="#"
                          data-target="#Modalstries"
                          data-toggle="modal"
                        >
                          <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                            <img
                              src="https://via.placeholder.com/50x50.png"
                              alt="image"
                              className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                            Victor Exrixon{" "}
                          </h4>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden mb-3 mt-3"
                      style={{
                        backgroundImage:
                          "url(https://via.placeholder.com/200x300.png)",
                      }}
                    >
                      <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                        <a
                          href="#"
                          data-target="#Modalstries"
                          data-toggle="modal"
                        >
                          <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                            <img
                              src="https://via.placeholder.com/50x50.png"
                              alt="image"
                              className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                            Surfiya Zakir{" "}
                          </h4>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden mb-3 mt-3"
                      style={{
                        backgroundImage:
                          "url(https://via.placeholder.com/200x300.png)",
                      }}
                    >
                      <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                        <a
                          href="#"
                          data-target="#Modalstries"
                          data-toggle="modal"
                        >
                          <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                            <img
                              src="https://via.placeholder.com/50x50.png"
                              alt="image"
                              className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                            David Goria{" "}
                          </h4>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden mb-3 mt-3"
                      style={{
                        backgroundImage:
                          "url(https://via.placeholder.com/200x300.png);",
                      }}
                    >
                      <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                        <a
                          href="#"
                          data-target="#Modalstries"
                          data-toggle="modal"
                        >
                          <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                            <img
                              src="https://via.placeholder.com/50x50.png"
                              alt="image"
                              className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                            David Goria{" "}
                          </h4>
                        </a>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              {/* create post */}
              {isAuth() ? (
                <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                  <div className="card-body p-0">
                    <a
                      onClick={postClick}
                      href="#"
                      className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
                    >
                      <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>
                      Create Post
                    </a>
                  </div>
                  <div className="card-body p-0 mt-3 position-relative">
                    <figure className="avatar position-absolute ms-2 mt-1 top-5">
                      <img
                        src="https://via.placeholder.com/50x50.png"
                        alt="image"
                        className="shadow-sm rounded-circle w30"
                      />
                    </figure>
                    <textarea
                      name="message"
                      className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                      cols={30}
                      rows={10}
                      value={description}
                      placeholder="What's on your mind?"
                      onChange={(e: any) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="card-body d-flex p-0 mt-0">
                    <a
                      href="#"
                      className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                    >
                      <i className="font-md text-danger feather-video me-2"></i>
                      <span className="d-none-xs">Live Video</span>
                    </a>
                    <a
                      onClick={fileClick}
                      className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                    >
                      <i className="font-md text-success feather-image me-2"></i>
                      <span className="d-none-xs ">Photo/Video</span>
                      <input
                        type="file"
                        ref={fileRef}
                        onChange={handleFileChange}
                        className="form-control w-25 h-25 "
                        style={{ display: "none" }}
                      />
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                    >
                      <i className="font-md text-warning feather-camera me-2"></i>
                      <span className="d-none-xs">Feeling/Activity</span>
                    </a>
                    <a
                      href="#"
                      className="ms-auto"
                      id="dropdownMenu4"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg"
                      aria-labelledby="dropdownMenu4"
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
                </div>
              ) : (
               <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                  <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3 m-0">
                      <img
                        src="https://via.placeholder.com/50x50.png"
                        alt="image"
                        className="shadow-sm rounded-circle w45"
                      />
                    </figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                      Goria Coast{" "}
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        2 hour ago
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi nulla dolor, ornare at commodo non, feugiat non
                      nisi. Phasellus faucibus mollis pharetra. Proin blandit ac
                      massa sed rhoncus{" "}
                      <a href="#" className="fw-600 text-primary ms-2">
                        See more
                      </a>
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
                            <a href="#" className="btn-round-lg bg-facebook">
                              <i className="font-xs ti-facebook text-white"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-twiiter">
                              <i className="font-xs ti-twitter-alt text-white"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-linkedin">
                              <i className="font-xs ti-linkedin text-white"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-instagram">
                              <i className="font-xs ti-instagram text-white"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn-round-lg bg-pinterest">
                              <i className="font-xs ti-pinterest text-white"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body p-0 d-flex">
                        <ul className="d-flex align-items-center justify-content-between mt-2">
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-tumblr">
                              <i className="font-xs ti-tumblr text-white"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-youtube">
                              <i className="font-xs ti-youtube text-white"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-flicker">
                              <i className="font-xs ti-flickr text-white"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="btn-round-lg bg-black">
                              <i className="font-xs ti-vimeo-alt text-white"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn-round-lg bg-whatsup">
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
              )}

              {/*   <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar me-3">
                    <img
                      src="https://via.placeholder.com/50x50.png"
                      alt="image"
                      className="shadow-sm rounded-circle w45"
                    />
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Surfiya Zakir{" "}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                      3 hour ago
                    </span>
                  </h4>
                  <a
                    href="#"
                    className="ms-auto"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                    aria-labelledby="dropdownMenu2"
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                    Phasellus faucibus mollis pharetra. Proin blandit ac massa
                    sed rhoncus{" "}
                    <a href="#" className="fw-600 text-primary ms-2">
                      See more
                    </a>
                  </p>
                </div>
                <div className="card-body d-block p-0">
                  <div className="row ps-2 pe-2">
                    <div className="col-xs-4 col-sm-4 p-1">
                      <a
                        href="https://via.placeholder.com/1200x800.png"
                        data-lightbox="roadtrip"
                      >
                        <img
                          src="https://via.placeholder.com/1200x800.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                    <div className="col-xs-4 col-sm-4 p-1">
                      <a
                        href="https://via.placeholder.com/1200x800.png"
                        data-lightbox="roadtrip"
                      >
                        <img
                          src="https://via.placeholder.com/1200x800.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                    <div className="col-xs-4 col-sm-4 p-1">
                      <a
                        href="https://via.placeholder.com/1200x800.png"
                        data-lightbox="roadtrip"
                        className="position-relative d-block"
                      >
                        <img
                          src="https://via.placeholder.com/1200x800.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                        <span className="img-count font-sm text-white ls-3 fw-600">
                          <b>+2</b>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex p-0 mt-3">
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
                    id="dropdownMenu21"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                  >
                    <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                    <span className="d-none-xs">Share</span>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                    aria-labelledby="dropdownMenu21"
                  >
                    <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                      Share{" "}
                      <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i>
                    </h4>
                    <div className="card-body p-0 d-flex">
                      <ul className="d-flex align-items-center justify-content-between mt-2">
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-facebook">
                            <i className="font-xs ti-facebook text-white"></i>
                          </a>
                        </li>
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-twiiter">
                            <i className="font-xs ti-twitter-alt text-white"></i>
                          </a>
                        </li>
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-linkedin">
                            <i className="font-xs ti-linkedin text-white"></i>
                          </a>
                        </li>
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-instagram">
                            <i className="font-xs ti-instagram text-white"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="btn-round-lg bg-pinterest">
                            <i className="font-xs ti-pinterest text-white"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body p-0 d-flex">
                      <ul className="d-flex align-items-center justify-content-between mt-2">
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-tumblr">
                            <i className="font-xs ti-tumblr text-white"></i>
                          </a>
                        </li>
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-youtube">
                            <i className="font-xs ti-youtube text-white"></i>
                          </a>
                        </li>
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-flicker">
                            <i className="font-xs ti-flickr text-white"></i>
                          </a>
                        </li>
                        <li className="me-1">
                          <a href="#" className="btn-round-lg bg-black">
                            <i className="font-xs ti-vimeo-alt text-white"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="btn-round-lg bg-whatsup">
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
              </div> */}
              {/* no image post */}

              <Post></Post>
             
              {/* image post */}

              {/* 
              <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar me-3">
                    <img
                      src="https://via.placeholder.com/50x50.png"
                      alt="image"
                      className="shadow-sm rounded-circle w45"
                    />
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Anthony Daugloi{" "}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                      2 hour ago
                    </span>
                  </h4>
                  <a href="#" className="ms-auto">
                    <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                  </a>
                </div>

                <div className="card-body p-0 me-lg-5">
                  <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                    Phasellus faucibus mollis pharetra. Proin blandit ac massa
                    sed rhoncus{" "}
                    <a href="#" className="fw-600 text-primary ms-2">
                      See more
                    </a>
                  </p>
                </div>
                <div className="card-body d-block p-0 mb-3">
                  <div className="row ps-2 pe-2">
                    <div className="col-xs-6 col-sm-6 p-1">
                      <a
                        href="https://via.placeholder.com/300x200.png"
                        data-lightbox="roadtri"
                      >
                        <img
                          src="https://via.placeholder.com/300x200.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                    <div className="col-xs-6 col-sm-6 p-1">
                      <a
                        href="https://via.placeholder.com/300x200.png"
                        data-lightbox="roadtri"
                      >
                        <img
                          src="https://via.placeholder.com/300x200.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="row ps-2 pe-2">
                    <div className="col-xs-4 col-sm-4 p-1">
                      <a
                        href="https://via.placeholder.com/300x200.png"
                        data-lightbox="roadtri"
                      >
                        <img
                          src="https://via.placeholder.com/300x200.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                    <div className="col-xs-4 col-sm-4 p-1">
                      <a
                        href="https://via.placeholder.com/300x200.png"
                        data-lightbox="roadtri"
                      >
                        <img
                          src="https://via.placeholder.com/300x200.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                    <div className="col-xs-4 col-sm-4 p-1">
                      <a
                        href="https://via.placeholder.com/300x200.png"
                        data-lightbox="roadtri"
                        className="position-relative d-block"
                      >
                        <img
                          src="https://via.placeholder.com/300x200.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                        <span className="img-count font-sm text-white ls-3 fw-600" />
                        <b>+2</b>
                      </a>
                    </div>
                  </div>
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
              </div> */}

              <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                <div className="owl-carousel category-card owl-theme overflow-hidden nav-none">
                  <div className="item">
                    <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                      <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                          <img
                            src="https://via.placeholder.com/50x50.png"
                            alt="image"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1">
                          Richard Bowers{" "}
                        </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                          @macale343
                        </p>
                        <a
                          href="#"
                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                      <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                          <img
                            src="https://via.placeholder.com/50x50.png"
                            alt="image"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1">
                          David Goria{" "}
                        </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                          @macale343
                        </p>
                        <a
                          href="#"
                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                      <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                          <img
                            src="https://via.placeholder.com/50x50.png"
                            alt="image"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1">
                          Vincent Parks{" "}
                        </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                          @macale343
                        </p>
                        <a
                          href="#"
                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                      <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                          <img
                            src="https://via.placeholder.com/50x50.png"
                            alt="image"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1">
                          Studio Express{" "}
                        </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                          @macale343
                        </p>
                        <a
                          href="#"
                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                      <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                          <img
                            src="https://via.placeholder.com/50x50.png"
                            alt="image"
                            className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xssss mt-3 mb-1">
                          Aliqa Macale{" "}
                        </h4>
                        <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                          @macale343
                        </p>
                        <a
                          href="#"
                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar me-3">
                    <img
                      src="https://via.placeholder.com/50x50.png"
                      alt="image"
                      className="shadow-sm rounded-circle w45"
                    />
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Anthony Daugloi{" "}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                      2 hour ago
                    </span>
                  </h4>
                  <a href="#" className="ms-auto">
                    <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                  </a>
                </div>
                <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                  <a href="#" className="video-btn">
                    <img src="https://via.placeholder.com/615x350.png" alt="" />
                  </a>
                </div>
                <div className="card-body p-0 me-lg-5">
                  <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                    Phasellus faucibus mollis pharetra. Proin blandit ac massa
                    sed rhoncus{" "}
                    <a href="#" className="fw-600 text-primary ms-2">
                      See more
                    </a>
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
              </div> */}

              {/* <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar me-3">
                    <img
                      src="https://via.placeholder.com/50x50.png"
                      alt="image"
                      className="shadow-sm rounded-circle w45"
                    />
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Anthony Daugloi{" "}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                      2 hour ago
                    </span>
                  </h4>
                  <a href="#" className="ms-auto">
                    <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                  </a>
                </div>
                <div className="card-body p-0 me-lg-5">
                  <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                    Phasellus faucibus mollis pharetra. Proin blandit ac massa
                    sed rhoncus{" "}
                    <a href="#" className="fw-600 text-primary ms-2">
                      See more
                    </a>
                  </p>
                </div>
                <div className="card-body d-block p-0 mb-3">
                  <div className="row ps-2 pe-2">
                    <div className="col-sm-12 p-1">
                      <a
                        href="https://via.placeholder.com/615x350.png"
                        data-lightbox="roadtr"
                      >
                        <img
                          src="https://via.placeholder.com/615x350.png"
                          className="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                  </div>
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
              </div> */}

              <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                <div
                  className="snippet mt-2 ms-auto me-auto"
                  data-title=".dot-typing"
                >
                  <div className="stage">
                    <div className="dot-typing"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-3 col-lg-4 ps-md-0">
              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Friend Connect
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                 { (follow && isAuth()) && follow.slice(1).map((fol:any, key:any) => (
                  <>
                   
                    <div key={key} className="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                      <figure className="avatar me-3">
                        <img
                          src="https://via.placeholder.com/50x50.png"
                          alt="image"
                          className="shadow-sm rounded-circle w45"
                        />
                      </figure>
                      <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        {fol[0].name} {fol[0].surname}
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          12 mutual friends
                        </span>
                      </h4>
                    </div>
                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                      <a
                        id={fol[0].id}
                        onClick={clickFollow}
                        href=""
                        className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-black text-center font-xssss fw-600 ls-1 rounded-xl"
                      >
                        Connect
                      </a>

                      <a
                        href="#"
                        className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl"
                      >
                        Delete
                      </a>
                    </div>
                  </>
                ))}
              </div>

              <div className="card w-100 shadow-xss rounded-xxl border-0 p-0 ">
                <div className="card-body d-flex align-items-center p-4 mb-0">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Friend Follow
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                {(getFollow && isAuth()) && getFollow.map((fol:any,key:any)=>(
                   <div key={key} className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3">
                   <figure className="avatar me-2 mb-0">
                     <img
                       src="https://via.placeholder.com/50x50.png"
                       alt="image"
                       className="shadow-sm rounded-circle w45"
                     />
                   </figure>
                   <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                     {fol[0].name} {fol[0].surname}
                     <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                       12 mutual friends
                     </span>
                   </h4>
                   <a
                     href="#"
                     className="btn-round-sm bg-white text-grey-900 feather-chevron-right font-xss ms-auto mt-2"
                   ></a>
                 </div>
                ))}
               
                
              </div>

              <div className="card w-100 shadow-xss rounded-xxl border-0 p-0 ">
                <div className="card-body d-flex align-items-center p-4 mb-0">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Friend Followers
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                {(getFollowers && isAuth()) && getFollowers.map((fol:any,key:any)=>(
                   <div key={key} className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3">
                   <figure className="avatar me-2 mb-0">
                     <img
                       src="https://via.placeholder.com/50x50.png"
                       alt="image"
                       className="shadow-sm rounded-circle w45"
                     />
                   </figure>
                   <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                     {fol[0].name} {fol[0].surname}
                     <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                       12 mutual friends
                     </span>
                   </h4>
                   <a
                     href="#"
                     className="btn-round-sm bg-white text-grey-900 feather-chevron-right font-xss ms-auto mt-2"
                   ></a>
                 </div>
                ))}
               
                
              </div>


              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                <div className="card-body d-flex align-items-center p-4">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Suggest Group
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                  <img
                    src="https://via.placeholder.com/400x300.png"
                    alt="img"
                    className="img-fluid rounded-xxl mb-2"
                  />
                </div>
                <div className="card-body dd-block pt-0 ps-4 pe-4 pb-4">
                  <ul className="memberlist mt-1 mb-2 ms-0 d-block">
                    <li className="w20">
                      <a href="#">
                        <img
                          src="https://via.placeholder.com/50x50.png"
                          alt="user"
                          className="w35 d-inline-block"
                          style={{ opacity: 1 }}
                        />
                      </a>
                    </li>
                    <li className="w20">
                      <a href="#">
                        <img
                          src="https://via.placeholder.com/50x50.png"
                          alt="user"
                          className="w35 d-inline-block"
                          style={{ opacity: 1 }}
                        />
                      </a>
                    </li>
                    <li className="w20">
                      <a href="#">
                        <img
                          src="https://via.placeholder.com/50x50.png"
                          alt="user"
                          className="w35 d-inline-block"
                          style={{ opacity: 1 }}
                        />
                      </a>
                    </li>
                    <li className="w20">
                      <a href="#">
                        <img
                          src="https://via.placeholder.com/50x50.png"
                          alt="user"
                          className="w35 d-inline-block"
                          style={{ opacity: 1 }}
                        />
                      </a>
                    </li>
                    <li className="last-member">
                      <a
                        href="#"
                        className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center"
                        style={{ height: "35px;", lineHeight: "35px;" }}
                      >
                        +2
                      </a>
                    </li>
                    <li className="ps-3 w-auto ms-1">
                      <a href="#" className="fw-600 text-grey-500 font-xssss">
                        Member apply
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Suggest Pages
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                  <img
                    src="https://via.placeholder.com/400x300.png"
                    alt="img"
                    className="img-fluid rounded-xxl mb-2"
                  />
                </div>
                <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                  <a
                    href="#"
                    className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
                  >
                    <i className="feather-external-link font-xss me-2"></i> Like
                    Page
                  </a>
                </div>

                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 overflow-hidden">
                  <img
                    src="https://via.placeholder.com/400x300.png"
                    alt="img"
                    className="img-fluid rounded-xxl mb-2 bg-lightblue"
                  />
                </div>
                <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                  <a
                    href="#"
                    className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
                  >
                    <i className="feather-external-link font-xss me-2"></i> Like
                    Page
                  </a>
                </div>
              </div>

              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center  p-4">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Event
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                  <div className="bg-success me-2 p-3 rounded-xxl">
                    <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                      <span className="ls-1 d-block font-xsss text-white fw-600">
                        FEB
                      </span>
                      22
                    </h4>
                  </div>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                    Meeting with clients{" "}
                    <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                      41 madison ave, floor 24 new work, NY 10010
                    </span>{" "}
                  </h4>
                </div>

                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                  <div className="bg-warning me-2 p-3 rounded-xxl">
                    <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                      <span className="ls-1 d-block font-xsss text-white fw-600">
                        APR
                      </span>
                      30
                    </h4>
                  </div>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                    Developer Programe{" "}
                    <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                      41 madison ave, floor 24 new work, NY 10010
                    </span>{" "}
                  </h4>
                </div>

                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                  <div className="bg-primary me-2 p-3 rounded-xxl">
                    <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                      <span className="ls-1 d-block font-xsss text-white fw-600">
                        APR
                      </span>
                      23
                    </h4>
                  </div>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                    Aniversary Event{" "}
                    <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                      41 madison ave, floor 24 new work, NY 10010
                    </span>{" "}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
