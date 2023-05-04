export const Register = () => {
  return (
    <div className="row">
      <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
        <div className="card shadow-none border-0 ms-auto me-auto login-card">
          <div className="card-body rounded-0 text-left">
            <h2 className="fw-700 display1-size display2-md-size mb-4">
              Create <br />
              your account
            </h2>
            <form>
              <div className="form-group icon-input mb-3">
                <i className="font-sm ti-user text-grey-500 pe-0"></i>
                <input
                  type="text"
                  className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group icon-input mb-3">
                <i className="font-sm ti-email text-grey-500 pe-0"></i>
                <input
                  type="text"
                  className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="Your Email Address"
                />
              </div>
              <div className="form-group icon-input mb-3">
                <input
                  type="Password"
                  className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                  placeholder="Password"
                />
                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
              </div>
              <div className="form-group icon-input mb-1">
                <input
                  type="Password"
                  className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                  placeholder="Confirm Password"
                />
                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
