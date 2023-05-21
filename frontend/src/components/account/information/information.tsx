

import { Leftbar } from "../../home/leftbar/Leftbar";
import { Navbar } from "../../home/navbar/Navbar";

import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import axios from "axios";

export const Information = () => {
  const isAuth = useIsAuthenticated();
  const auth: any = useAuthUser();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [date, setDate] = useState();
  const [gender, setGender] = useState();
  const [biography, setBiography] = useState();


  
  /*async function getWalletPublicKey(walletAddress: string): Promise<string> {
    const url = `https://stargate.stargaze.network/auth/accounts/${walletAddress}`;
  
    try {
      const response = await axios.get(url);
      const publicKey = response.data.result.value.public_key;
      return publicKey;
    } catch (error) {
      console.error('Hata:', error);
      throw error;
    }
  }
  
  // Kullanım örneği
  const walletAddress = auth().id;
  getWalletPublicKey(walletAddress)
    .then(publicKey => {
      console.log('Cüzdanın Genel Anahtarı:', publicKey);
    })
    .catch(error => {
      console.error('Hata:', error);
    });
*/
  useEffect(() => {
    if (isAuth()) {
      axios
        .get(`http://localhost:3000/user/profile/${auth().id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
         
        })
        .then((user:any) => {
          setName(user.data.user[0][0].name)
          setSurname(user.data.user[0][0].surname)
          setDate(user.data.user[0][0].date)
          setGender(user.data.user[0][0].gender)
          setBiography(user.data.user[0][0].biography)
        });
    }
  }, []);
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
                        {name} {surname}
                      </h2>
                    </div>
                  </div>

                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Firstname
                          </label>
                          <input type="text" value={name} className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Surname
                          </label>
                          <input type="text" value={surname} className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Date
                          </label>
                          <input type="date" value={date} className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Gender
                          </label>
                          <select
                            value={gender}
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
                          value={biography}
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
