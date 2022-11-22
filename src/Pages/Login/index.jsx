import Footer from "../../Components/Footer";
import "../../Styles/scss/loginStyle.scss";
import firebase from "../../Services/firebaseconnection";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/user";
import { toast } from "react-toastify";

export default function Login() {
  //Contexts, States e Hooks
  const { email, setEmail, password, setPassword, } = useContext(UserContext);
  let navigate = useNavigate();

  //Do Login Function
  async function doLogin() {
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
      <div className="content-login-area">
        <div id="login-form-wrap">
          <h2>SIGN IN:</h2>
          <div id="login-form">
            <p>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                autoComplete="off"
                className="login"
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
              />
            </p>
            <p>
              <input
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                autoComplete="off"
                className="login"
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
            </p>
            <p>
              <Link className="register-link" to="/register">
                Don't have an account yet? Sign up here!
              </Link>
            </p>
            <p>
              <button onClick={doLogin} className="logbtn">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
