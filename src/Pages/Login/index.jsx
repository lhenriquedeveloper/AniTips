import "../../Styles/css/loginStyle.css"
import firebase from '../../Services/firebaseconnection';
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../../Contexts/user';



export default function Login() {
    const { email, setEmail, password, setPassword } = useContext(UserContext);
    let navigate = useNavigate();

    async function doLogin() {
        await firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                await firebase
                    .firestore()
                    .collection("users")
                    .doc(value.user.id)
                    .get()
                    .then(() => {
                        navigate("/home");
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <div id="login-form-wrap">
                <h2>SIGN IN:</h2>
                <div id="login-form">
                    <p>
                        <input required onChange={(e) => { setEmail(e.target.value) }} value={email} autoComplete="off" className="login" type="email" id="email" name="email" placeholder="Email" />
                    </p>
                    <p>
                        <input required onChange={(e) => { setPassword(e.target.value) }} value={password} autoComplete="off" className="login" type="password" id="password" name="password" placeholder="Password" />
                    </p>
                    <p>
                        <Link className="register-link" to="/register">Don't have an account yet? Sign up here!</Link>
                    </p>
                    <p>
                        <button onClick={doLogin} className="logbtn">Login</button>
                    </p>
                </div>
            </div>
        </div>
    )
}