import { Leftbar } from "../../home/leftbar/Leftbar";
import { Navbar } from "../../home/navbar/Navbar";


export const Information = () => {
  return (
    <>
      <Navbar />
      <Leftbar />
      
      <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                  <a
                    href="default-settings.html"
                    className="d-inline-block mt-2"
                  >
                    <i className="ti-arrow-left font-sm text-white"></i>
                  </a>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    Account Details
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                        <img
                          src="https://via.placeholder.com/100x100.png"
                          alt="image"
                          className="shadow-sm rounded-3 w-100"
                        />
                      </figure>
                      <h2 className="fw-700 font-sm text-grey-900 mt-3">
                        Surfiya Zakir
                      </h2>
                      <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
                        Brooklyn
                      </h4>
                    </div>
                  </div>

                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Firstname
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Surname
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Date
                          </label>
                          <input type="date" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Gender
                          </label>
                          <select
                            className="style2-input ps-5 py-0 form-control text-grey-900 font-xss ls-3"
                            aria-label="Default select example"
                          >
                            <option selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="famale">Famale</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Biography
                          </label>
                          <textarea
                            className="style2-input ps-5 py-0 form-control text-grey-900 font-xss ls-3"
                            placeholder="Biography..."
                          ></textarea>
                        </div>
                      </div>
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
