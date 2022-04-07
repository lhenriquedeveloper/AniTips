import "../../Styles/CSS/loginStyle.css"

export default function Login() {
    return (
        <div>
            <div id="login-form-wrap">
                <h2>SIGN IN</h2>
                <div id="login-form">
                    <p>
                        <input className="login" type="email" id="email" name="email" placeholder="Email" />
                    </p>
                    <p>
                        <input
                            className="login"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                        />
                    </p>
                    <p>
                        <button className="logbtn">Login</button>
                    </p>
                </div>
            </div>
        </div>
    )
}