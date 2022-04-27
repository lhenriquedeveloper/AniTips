import firebase from "../../Services/firebaseconnection";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../Contexts/user';


export default function Register() {
    //Contexts, States and Hooks
    let navigate = useNavigate();
    const { nickname, setNickname, email, setEmail, password, setPassword } = useContext(UserContext);

    // New User Create Function
    async function newUser() {
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
                        navigate("/");
                    })
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    toast.error('Your password is too weak', {
                        theme: "dark",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    })
                } else if (error.code === "auth/email-already-in-use")
                    toast.error('Email already in use', {
                        theme: "dark",
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    });
            })
    }

    return (
        <div>
            <div className="content-login-area">
                <div id="login-form-wrap">
                    <h2>SIGN UP:</h2>
                    <div id="login-form">
                        <p>
                            <input onChange={(e) => { setNickname(e.target.value) }} value={nickname} required autoComplete="off" className="login" type="nickname" id="nickname" name="nickname" placeholder="Type your nickname here" />
                        </p>
                        <p>
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} required autoComplete="off" className="login" type="email" id="email" name="email" placeholder="email@email.com" />
                        </p>
                        <p>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} required autoComplete="off" className="login" type="password" id="password" name="password" placeholder="********" />
                        </p>
                        <p>
                            <button onClick={newUser} className="logbtn">Register</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}