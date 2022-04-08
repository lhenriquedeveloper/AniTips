import { Link } from "react-router-dom"
import "../../Styles/css/loginStyle.css"

export default function Login() {
    return (
        <div>
            <div id="login-form-wrap">
                <h2>SIGN IN:</h2>
                <div id="login-form">
                    <p>
                        <input required autoComplete="off" className="login" type="email" id="email" name="email" placeholder="Email" />
                    </p>
                    <p>
                        <input required autoComplete="off" className="login" type="password" id="password" name="password" placeholder="Password" />
                    </p>
                    <p>
                        <Link className="register-link" to="/register">Don't have an account yet? Sign up here!</Link>
                    </p>
                    <p>
                        <button className="logbtn">Login</button>
                    </p>
                </div>
            </div>
        </div>
    )
}