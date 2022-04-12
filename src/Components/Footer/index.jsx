import "../../Styles/css/footerStyle.css";

export default function Footer() {
    return (
        <div>
            <footer>
                <div class="footer-content">
                    <div className="logoWrapper">
                        <span className="stylish">ANIME</span>
                        <span className="logo">TIPS</span>
                    </div>
                    <p>AniTips is a basic application that allows its users to have new anime recommendations to watch. </p>
                </div>
                <div class="footer-bottom">
                    <p>copyright &copy; <a href="https://github.com/lhenriquedeveloper">LheniqueDeveloper</a>  </p>
                </div>
            </footer>
        </div>
    )
}