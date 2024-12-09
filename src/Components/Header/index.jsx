import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../Contexts/user"
import '../../Styles/scss/headerStyle.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import firebase from "../../Services/firebaseconnection";

// Login Function
async function logout() {
    await firebase.auth().signOut()
}
// Condicional Rendering Buttons Function
function LogButtons(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
          <ul className="navigation">
          <li className="navItem">
            <a href="/saves" className="navLink">Favorites</a>
          </li>
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
          <div className="logoWrapper" onClick={() => navigate("/home")}>
            <span className="stylish">Ani</span>
            <span className="logo">Tips</span>
          </div>
          <LogButtons isLoggedIn={userLogged} />
        </nav>
      </header>
    )
}