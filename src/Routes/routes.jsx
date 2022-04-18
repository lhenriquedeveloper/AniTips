import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useContext } from "react"
import { UserContext } from "../Contexts/user"
import firebase from "../Services/firebaseconnection"
import "../Styles/css/renderingStyle.css"


const Login = lazy(() => import('../Pages/Login'))
const Register = lazy(() => import('../Pages/Register'));
const Home = lazy(() => import('../Pages/Home'));
const Detail = lazy(() => import('../Pages/Detail'));
const Saves = lazy(() => import('../Pages/Saves'));
const NotFound = lazy(() => import('../Pages/NotFound'));


export default function RoutesFile() {
    const { userLogged, setUserLogged } = useContext(UserContext);

    const ProtectedRoute = ({ children }) => {
        if (!firebase.auth().currentUser && userLogged === false) {
            return <Navigate to="/" replace />
        }
        else {
            setUserLogged(true);
            return children;
        }
    }

    return (
        <div>
            <Suspense fallback={
                <div className="rendering-display">
                    <h1 className="rendering-message">Loading....</h1>
                </div>
            }>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/saves" element={<ProtectedRoute> <Saves /> </ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    )
}