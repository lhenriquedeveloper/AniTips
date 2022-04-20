import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../Contexts/user"
import '../../Styles/css/headerStyle.css';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import firebase from "../../Services/firebaseconnection";


async function logout() {
    await firebase.auth().signOut()
}

function LogButtons(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <ul className="navigation">
                <li className="parent"><Link to="/saves" className="link" > <SaveIcon /> </Link></li>
                <li className="parent"><Link onClick={logout} to="/" className="link"> <LogoutIcon /></Link></li>
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
    let navigate = useNavigate();
    return (
        <header className="header">
            <nav className="navigationWrapper">
                <div className="logoWrapper" onClick={() => { navigate("/home") }}>
                    <span className="stylish">Anime</span>
                    <span className="logo">Tips</span>
                </div>
                <LogButtons isLoggedIn={userLogged} />
            </nav>
        </header>
    )
}