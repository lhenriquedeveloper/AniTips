import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/user";
import "../../Styles/scss/headerStyle.scss";
import firebase from "../../Services/firebaseconnection";

// Função de Logout
async function logout() {
  await firebase.auth().signOut();
}

// Componente de Botões Condicionais
function LogButtons({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <ul className="navigation">
        <li className="navItem">
          <Link to="/saves" className="navLink">
            <i className="bi bi-star-fill" style={{ marginRight: "0.5em" }}></i>
            Favorites
          </Link>
        </li>
        <li className="navItem">
          <Link to="/home" className="navLink">
            <i
              className="bi bi-house-fill"
              style={{ marginRight: "0.5em" }}
            ></i>
            Home
          </Link>
        </li>
        <li className="navItem">
          <button className="logoutButton" onClick={logout}>
            <i
              className="bi bi-box-arrow-right"
              style={{ marginRight: "0.5em" }}
            ></i>
            Logout
          </button>
        </li>
      </ul>
    );
  } else {
    return null;
  }
}

export default function Header() {
  const { userLogged } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="navigationWrapper">
        <div className="logoWrapper" onClick={() => navigate("/home")}>
          <span className="stylish">Ani</span>
          <span className="logo">Tips</span>
        </div>
        <LogButtons isLoggedIn={userLogged} navigate={navigate} />
      </nav>
    </header>
  );
}
