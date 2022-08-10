import { Link } from "react-router-dom"
import "../../Styles/scss/footerStyle.scss"
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <footer className="footer">
            <nav className="navigationWrapper-footer">
                <div className="logoWrapper-footer">
                    <span className="stylish-footer">Made by <a href="https://github.com/lhenriquedeveloper/AniTips">@LhenriqueDeveloper <GitHubIcon></GitHubIcon></a></span>
                </div>
            </nav>
        </footer>
    )
}