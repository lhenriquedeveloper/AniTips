import '../../Styles/CSS/headerStyle.css'
import { Link } from "react-router-dom"
export default function Header() {
    return (
        <header className="header">
            <nav className="navigationWrapper">
                <div className="logoWrapper">
                    <span className="stylish">Anime</span>
                    <span className="logo">Tips</span>
                </div>
                <ul className="navigation">
                    <li className="parent"><a class="link" href="#">Saves</a></li>
                    <li className="parent"><a class="link" href="#">Logout</a></li>
                </ul>
            </nav>
        </header>
    )
}