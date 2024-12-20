import firebase from "../../Services/firebaseconnection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/user";
import { PulseLoader } from "react-spinners";
import "../../Styles/scss/registerStyle.scss";

export default function Register() {
  //Contexts, States and Hooks
  let navigate = useNavigate();
  const { nickname, setNickname, email, setEmail, password, setPassword } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // New User Create Function
  async function newUser() {
    setLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        await firebase
          .firestore()
          .collection("users")
          .doc(value.user.id)
          .set({
            nickname: nickname,
            email: email,
            password: password,
          })
          .then(() => {
            setNickname("");
            setEmail("");
            setPassword("");
            setLoading(false);
            navigate("/");
          });
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          toast.error("Your password is too weak", {
            theme: "dark",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        } else if (error.code === "auth/email-already-in-use")
          toast.error("Email already in use", {
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
      <div className="content-signup">
        <div className="signup-info">
          <h1 className="title">Sign Up</h1>
        </div>
        <div className="signup-data">
          <div className="textfield">
            <label>Nickname:</label>
            <input
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              value={nickname}
              required
              autoComplete="off"
              className="signup-input"
              type="text"
              id="nickname"
              name="nickname"
              placeholder="Type your nickname here"
            />
          </div>
          <div className="textfield">
            <label>E-mail:</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              autoComplete="off"
              className="signup-input"
              type="email"
              id="email"
              name="email"
              placeholder="email@email.com"
            />
          </div>
          <div className="textfield">
            <label>Password:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
              autoComplete="off"
              className="signup-input"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>
        </div>

        <div className="signup-buttons">
          <button className="btn-signup" onClick={newUser}>
            {loading ? <PulseLoader color={"#fff"} size={14} /> : "Register"}
          </button>
          <button className="btn-home" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
