import "../../Styles/scss/notFoundStyle.scss"
export default function NotFound() {
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="xs-12 md-6 mx-auto">
                        <div id="countUp">
                            <div class="number" data-count="404">404</div>
                            <div class="text">Page not found!</div>
                            <div class="text">Click on logo to go back to home.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}