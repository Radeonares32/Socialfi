import { useRef } from "react";
import axios from "axios";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export const Register = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const name: any = useRef(null);
  const surname: any = useRef(null);
  const date: any = useRef(null);
  const gender: any = useRef(null);
  const biography: any = useRef(null);
  const chainId = "cosmoshub-4";
  const submitData = async (e: any) => {
    e.preventDefault();
    if (name.current.value === "") {
      alert("no input can be left blank");
    }
    if (surname.current.value === "") {
      alert("no input can be left blank");
    }
    if (date.current.value === "") {
      alert("no input can be left blank");
    }
    if (gender.current.value === "") {
      alert("no input can be left blank");
    }
    if (biography.current.value === "") {
      alert("no input can be left blank");
    }
    if (window.keplr && window.getOfflineSigner) {
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      const cosmJS = new SigningCosmosClient(
        "https://lcd-cosmoshub.keplr.app",
        accounts[0].address,
        offlineSigner
      );
      const token: any = await axios.post(
        "http://localhost:3000/user/loginWallet",
        {
          walletAddr: accounts[0].address,
          name: name.current.value,
          surname: surname.current.value,
          date: date.current.value,
          gender: gender.current.value,
          biography: biography.current.value,
        }
      );
      if (token.data.user.message === "already") {
        signIn({
          token: token.data.user.token as string,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            id: accounts[0].address,
            token:token.data.user.token as string
          },
        });
        navigate("/");
      } else if (token.data.user.message === "1") {
        signIn({
          token: token.data.user.token as string,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            id: accounts[0].address,
            token:token.data.user.token as string
          },
        });
        navigate("/");
      }
    } else {
      alert("Keplr is not installed!");
    }
  };
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
                ref={name}
                type="text"
                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group icon-input mb-3">
              <i className="font-sm ti-user text-grey-500 pe-0"></i>
              <input
                ref={surname}
                type="text"
                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                placeholder="Your Surname"
              />
            </div>
            <div className="form-group icon-input mb-3">
              <input
                ref={date}
                type="date"
                className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                placeholder="Date"
              />
              <i className="font-sm ti-lock text-grey-500 pe-0"></i>
            </div>
            <div className="form-group icon-input mb-1">
              <i className="font-sm ti-user text-grey-500 pe-0"></i>
              <select
                ref={gender}
                className="style2-input ps-5 py-0 form-control text-grey-900 font-xss ls-3"
                aria-label="Default select example"
              >
                <option selected>Gender</option>
                <option value="male">Male</option>
                <option value="famale">Famale</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group icon-input mb-1">
              <i className="font-sm ti-user text-grey-500 pe-0"></i>
              <textarea
                ref={biography}
                className="style2-input ps-5 py-0 form-control text-grey-900 font-xss ls-3"
                placeholder="Biography..."
              ></textarea>
            </div>
            <div className="form-group icon-input mt-4">
              <button
                onClick={submitData}
                className="p-1 lh-20 w100 bg-primary-gradiant text-black text-center font-xssss fw-600 ls-1 rounded-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
