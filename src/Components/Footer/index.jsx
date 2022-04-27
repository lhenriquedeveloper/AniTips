import { Link } from "react-router-dom"
import "../../Styles/css/footerStyle.css"
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <footer className="footer">
            <nav className="navigationWrapper-footer">
                <div className="logoWrapper-footer">
                    <span className="stylish-footer">Made by <Link to="https://github.com/lhenriquedeveloper/AniTips">@LhenriqueDeveloper <GitHubIcon></GitHubIcon></Link></span>
                </div>
            </nav>
        </footer>
    )
}