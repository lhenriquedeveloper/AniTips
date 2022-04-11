import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import "../Styles/css/renderingStyle.css"


const Login = lazy(() => import('../Pages/Login'))
const Register = lazy(() => import('../Pages/Register'));
const Home = lazy(() => import('../Pages/Home'));
const Detail = lazy(() => import('../Pages/Detail'));
const Saves = lazy(() => import('../Pages/Saves'));
const NotFound = lazy(() => import('../Pages/NotFound'));



export default function RoutesFile() {
    return (
        <div>
            <Suspense fallback={<h1 className="rendering-message">Rendering your page....</h1>}>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/saves" element={<Saves />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    )
}