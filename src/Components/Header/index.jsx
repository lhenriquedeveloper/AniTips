import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../Contexts/user"
import '../../Styles/css/headerStyle.css';



function LogButtons(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <ul className="navigation">
                <li className="parent"><Link to="/saves" className="link" >Saves</Link></li>
                <li className="parent"><button className="log-button">LOGOUT</button></li>
            </ul>
        )
    }
    else {
        return (
            <p></p>
        )
    }

}

export default function Header() {
    const { userLogged } = useContext(UserContext);
    return (
        <header className="header">
            <nav className="navigationWrapper">
                <div className="logoWrapper">
                    <span className="stylish">Anime</span>
                    <span className="logo">Tips</span>
                </div>
                <LogButtons isLoggedIn={userLogged} />
            </nav>
        </header>
    )
}