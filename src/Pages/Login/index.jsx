import Footer from "../../Components/Footer";
import "../../Styles/scss/loginStyle.scss";
import firebase from "../../Services/firebaseconnection";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/user";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

export default function Login() {
  //Contexts, States e Hooks
  const { email, setEmail, password, setPassword, } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  //Do Login Function
  async function doLogin() {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        await firebase
          .firestore()
          .collection("users")
          .doc(value.user.id)
          .get()
          .then(() => {
            setLoading(false);
            navigate("/home");
            toast(' Welcome to AnimeTips 😁', {
              theme: "dark",
              position: "top-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
            })
            setEmail("");
            setPassword("");
            ;
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Email or password invalid! ', {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      });
  }

  return (
    <>
      <div className="content-login">
        <div className="login-info">
          <h1 className="title">Sign In</h1>
          <p className="subtitle">Let's know some new animes?</p>
        </div>

        <div className="login-data">
          <div className="textfield">
            <label>E-mail:</label>
            <input placeholder="Enter with your e-mail"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              autoComplete="off"
              className="login"
              type="email"
              id="email"
              name="email" />
          </div>
          <div className="textfield">
            <label>Password:</label>
            <input placeholder="Enter with your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              autoComplete="off"
              className="login"
              type="password"
              id="password"
              name="password" />
          </div>
        </div>

        <div className="login-button">
          <button className="btn-login" onClick={doLogin}>{loading ? <PulseLoader color={'#fff'} size={14} /> : 'Login'}</button>
        </div>

        <div className="register">
          <Link to="/register">Don't have an account yet? Sign up here!</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
