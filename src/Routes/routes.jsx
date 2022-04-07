import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"


const Login = lazy(() => import('../Pages/Login'))
const Home = lazy(() => import('../Pages/Home'));
const Detail = lazy(() => import('../Pages/Detail'));
const Saves = lazy(() => import('../Pages/Saves'));
const NotFound = lazy(() => import('../Pages/NotFound'));


export default function RoutesFile() {
    return (
        <div>
            <Suspense fallback={<h1>Rendering...</h1>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/saves" element={<Saves />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    )
}