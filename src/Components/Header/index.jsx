import { Link } from "react-router-dom"
import '../../Styles/CSS/headerStyle.css'

export default function Header() {
    return (
        <header className="header">
            <nav className="navigationWrapper">
                <div className="logoWrapper">
                    <span className="stylish">Anime</span>
                    <span className="logo">Tips</span>
                </div>
                {/* <ul className="navigation">
                    <li className="parent"><Link to="/saves" className="link" >Saves</Link></li>
                    <li className="parent"><button className="log-button">LOGOUT</button></li>
                </ul> */}
            </nav>
        </header>
    )
}