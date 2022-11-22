
import "../../Styles/scss/footerStyle.scss"
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <footer className="footer">
            <nav className="navigationWrapper-footer">
                <div className="logoWrapper-footer">
                    <span className="stylish-footer">
                        Made by 
                        <a 
                            className="stylish-href" 
                            href="https://github.com/lhenriquedeveloper/AniTips">
                            @LhenriqueDeveloper  
                            <GitHubIcon />
                        </a>
                    </span>
                </div>
            </nav>
        </footer>
    )
}