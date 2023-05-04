export const Register = () => {
  return (
    <div className="vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
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
              <i className="font-sm ti-user text-grey-500 pe-0"></i>
              <input
                type="text"
                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                placeholder="Your Surname"
              />
            </div>
            <div className="form-group icon-input mb-3">
              <input
                type="date"
                className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                placeholder="Date"
              />
              <i className="font-sm ti-lock text-grey-500 pe-0"></i>
            </div>
            <div className="form-group icon-input mb-1">
            <i className="font-sm ti-user text-grey-500 pe-0"></i>
              <select className="style2-input ps-5 py-0 form-control text-grey-900 font-xss ls-3" aria-label="Default select example">
                <option selected >Gender</option>
                <option value="male">Male</option>
                <option value="famale">Famale</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group icon-input mb-1">
            <i className="font-sm ti-user text-grey-500 pe-0"></i>
            <textarea className="style2-input ps-5 py-0 form-control text-grey-900 font-xss ls-3" placeholder="Biography..."></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
