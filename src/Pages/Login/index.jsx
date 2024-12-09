import Footer from "../../Components/Footer";
import "../../Styles/scss/loginStyle.scss";
import firebase from "../../Services/firebaseconnection";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/user";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import animeHero from "../../Assets/anime-hero-image.png"

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
  <div className="anime-login-container">
    <div className="anime-login-content">
      <div className="anime-intro">
        <h1 className="anime-title">Discover New Worlds</h1>
        <p className="anime-subtitle">
          Your gateway to exploring an amazing selection of animes.
        </p>
        <div className="anime-cta">
          <p>Join now or sign in to start your journey!</p>
        </div>
      </div>

      <div className="anime-login-form">
        <div className="textfield">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
            required
          />
        </div>
        <div className="textfield">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
            required
          />
        </div>
        <button className="btn-login" onClick={doLogin}>
          {loading ? <PulseLoader color="#fff" size={14} /> : 'Login'}
        </button>
        <p className="register-cta">
          Don't have an account?{' '}
          <Link to="/register" className="register-link">
            Sign up now!
          </Link>
        </p>
      </div>
    </div>

    <div className="anime-bg">
      <img
        src={animeHero}
        alt="Anime hero background"
        className="anime-hero-image"
      />
    </div>
  </div>
  <Footer />
</>
  );
}
